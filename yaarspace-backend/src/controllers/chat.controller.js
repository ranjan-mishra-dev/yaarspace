import supabaseAdmin from "../db/supabaseClient.js";
import { io } from "../app.js";

const isUserInConversation = async (conversationId, userId) => {
  const { data, error } = await supabaseAdmin
    .from("conversations")
    .select("*")
    .eq("id", conversationId)
    .or(`user1_id.eq.${userId},user2_id.eq.${userId}`)
    .single();

  if (error || !data) return null;
  return data;
};

export const getMyConversations = async (req, res) => {
  try {
    const userId = req.user.id;
    const search = req.query.search || "";

    const { data: conversations, error } = await supabaseAdmin
      .from("conversations")
      .select(
        `
        id,
        user1_id,
        user2_id,
        last_message,
        last_message_at,
        created_at,
        user1:user1_id (
          id,
          full_name,
          college_name,
          avatar_url
        ),
        user2:user2_id (
          id,
          full_name,
          college_name,
          avatar_url
        )
      `,
      )
      .or(`user1_id.eq.${userId},user2_id.eq.${userId}`)
      .order("last_message_at", { ascending: false, nullsFirst: false });

    if (error) throw error;

    const result = [];

    for (const conversation of conversations) {
      const otherUser =
        conversation.user1_id === userId
          ? conversation.user2
          : conversation.user1;

      if (
        search &&
        !otherUser?.full_name?.toLowerCase().includes(search.toLowerCase())
      ) {
        continue;
      }

      const { count: unreadCount } = await supabaseAdmin
        .from("messages")
        .select("*", { count: "exact", head: true })
        .eq("conversation_id", conversation.id)
        .neq("sender_id", userId)
        .eq("is_read", false)
        .eq("deleted_for_everyone", false);

      result.push({
        id: conversation.id,
        otherUser,
        last_message: conversation.last_message,
        last_message_at: conversation.last_message_at,
        unreadCount: unreadCount || 0,
      });
    }

    return res.status(200).json({
      success: true,
      totalConnections: result.length,
      conversations: result,
    });
  } catch (error) {
    console.error("Get conversations error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch conversations",
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const userId = req.user.id;
    const { conversationId } = req.params;

    const conversation = await isUserInConversation(conversationId, userId);

    if (!conversation) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to access this chat",
      });
    }

    const { data, error } = await supabaseAdmin
      .from("messages")
      .select("*")
      .eq("conversation_id", conversationId)
      .eq("deleted_for_everyone", false)
      .order("created_at", { ascending: true });

    if (error) throw error;

    return res.status(200).json({
      success: true,
      messages: data,
    });
  } catch (error) {
    console.error("Get messages error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch messages",
    });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.user.id;
    const { conversationId } = req.params;
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message cannot be empty",
      });
    }

    const conversation = await isUserInConversation(conversationId, senderId);

    if (!conversation) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to message in this chat",
      });
    }

    const receiverId =
      conversation.user1_id === senderId
        ? conversation.user2_id
        : conversation.user1_id;

    const { data: newMessage, error } = await supabaseAdmin
      .from("messages")
      .insert({
        conversation_id: conversationId,
        sender_id: senderId,
        message: message.trim(),
      })
      .select()
      .single();

    if (error) throw error;

    await supabaseAdmin
      .from("conversations")
      .update({
        last_message: message.trim(),
        last_message_at: new Date().toISOString(),
      })
      .eq("id", conversationId);

    const { data: senderProfile } = await supabaseAdmin
      .from("profiles")
      .select("full_name")
      .eq("id", senderId)
      .single();

    await supabaseAdmin.from("notifications").upsert(
      {
        user_id: receiverId,
        type: "new_message",
        title: "New message",
        message: `${senderProfile?.full_name || "Someone"} texted you`,
        is_read: false,
        metadata: {
          conversation_id: conversationId,
          sender_id: senderId,
        },
      },
      {
        onConflict: "user_id,type,(metadata->>'conversation_id')",
      },
    );

    // realtime message emit
    io.to(conversationId).emit("receive_message", newMessage);

    // realtime inbox/chat-list update
    io.to(conversationId).emit("conversation_updated", {
      conversationId,
      last_message: message.trim(),
      last_message_at: new Date().toISOString(),
    });

    return res.status(201).json({
      success: true,
      message: "Message sent",
      data: newMessage,
    });
  } catch (error) {
    console.error("Send message error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
};

export const markMessagesAsRead = async (req, res) => {
  try {
    const userId = req.user.id;
    const { conversationId } = req.params;

    const conversation = await isUserInConversation(conversationId, userId);

    if (!conversation) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to access this chat",
      });
    }

    await supabaseAdmin
      .from("messages")
      .update({ is_read: true })
      .eq("conversation_id", conversationId)
      .neq("sender_id", userId)
      .eq("is_read", false);

    await supabaseAdmin
      .from("notifications")
      .update({ is_read: true })
      .eq("user_id", userId)
      .eq("type", "new_message")
      .eq("metadata->>conversation_id", conversationId);

    return res.status(200).json({
      success: true,
      message: "Messages marked as read",
    });
  } catch (error) {
    console.error("Mark read error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to mark messages as read",
    });
  }
};

export const editMessage = async (req, res) => {
  try {
    const userId = req.user.id;
    const { messageId } = req.params;
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message cannot be empty",
      });
    }

    const { data: existingMessage, error: fetchError } = await supabaseAdmin
      .from("messages")
      .select("*")
      .eq("id", messageId)
      .eq("sender_id", userId)
      .single();

    if (fetchError || !existingMessage) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    const { data, error } = await supabaseAdmin
      .from("messages")
      .update({
        message: message.trim(),
        is_edited: true,
        updated_at: new Date().toISOString(),
      })
      .eq("id", messageId)
      .eq("sender_id", userId)
      .select()
      .single();

    if (error) throw error;

    io.to(existingMessage.conversation_id).emit("message_edited", data);

    return res.status(200).json({
      success: true,
      message: "Message edited",
      data,
    });
  } catch (error) {
    console.error("Edit message error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to edit message",
    });
  }
};

export const deleteMessageForEveryone = async (req, res) => {
  try {
    const userId = req.user.id;
    const { messageId } = req.params;

    const { data: existingMessage, error: fetchError } = await supabaseAdmin
      .from("messages")
      .select("*")
      .eq("id", messageId)
      .eq("sender_id", userId)
      .single();

    if (fetchError || !existingMessage) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    const { data, error } = await supabaseAdmin
      .from("messages")
      .update({
        deleted_for_everyone: true,
        message: "This message was deleted",
        updated_at: new Date().toISOString(),
      })
      .eq("id", messageId)
      .eq("sender_id", userId)
      .select()
      .single();

    if (error) throw error;

    io.to(existingMessage.conversation_id).emit("message_deleted", data);

    return res.status(200).json({
      success: true,
      message: "Message deleted for everyone",
      data,
    });
  } catch (error) {
    console.error("Delete message error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete message",
    });
  }
};
