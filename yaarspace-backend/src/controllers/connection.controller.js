import supabaseAdmin from "../db/supabaseClient.js";

const getConversationUsers = (userA, userB) => {
  return userA < userB
    ? { user1_id: userA, user2_id: userB }
    : { user1_id: userB, user2_id: userA };
};

export const sendConnectionRequest = async (req, res) => {
  try {
    const senderId = req.user.id;
    const { receiverId } = req.params;

    if (senderId === receiverId) {
      return res.status(400).json({
        success: false,
        message: "You cannot send request to yourself",
      });
    }

    const { data: receiverProfile, error: receiverError } = await supabaseAdmin
      .from("profiles")
      .select("id, full_name")
      .eq("id", receiverId)
      .single();

    if (receiverError || !receiverProfile) {
      return res.status(404).json({
        success: false,
        message: "Receiver profile not found",
      });
    }

    const { data: senderProfile } = await supabaseAdmin
      .from("profiles")
      .select("id, full_name")
      .eq("id", senderId)
      .single();

    const { data: existingConnection } = await supabaseAdmin
      .from("connections")
      .select("*")
      .or(
        `and(sender_id.eq.${senderId},receiver_id.eq.${receiverId}),and(sender_id.eq.${receiverId},receiver_id.eq.${senderId})`,
      )
      .maybeSingle();

    if (existingConnection) {
      return res.status(409).json({
        success: false,
        message: "Connection request already exists",
      });
    }

    const { data: connection, error } = await supabaseAdmin
      .from("connections")
      .insert({
        sender_id: senderId,
        receiver_id: receiverId,
        status: "pending",
      })
      .select()
      .single();

    if (error) throw error;

    await supabaseAdmin.from("notifications").insert({
      user_id: receiverId,
      type: "connection_request",
      title: "New connection request",
      message: `${senderProfile?.full_name || "Someone"} sent you a connection request`,
      metadata: {
        connection_id: connection.id,
        sender_id: senderId,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Connection request sent successfully",
      connection,
    });
  } catch (error) {
    console.error("Send connection error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getReceivedRequests = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data, error } = await supabaseAdmin
      .from("connections")
      .select(
        `
        id,
        status,
        created_at,
        sender:sender_id (
          id,
          full_name,
          college_name,
          avatar_url,
          tech_stack,
          about_me
        )
      `,
      )
      .eq("receiver_id", userId)
      .eq("status", "pending")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return res.status(200).json({
      success: true,
      requests: data,
    });
  } catch (error) {
    console.error("Get received requests error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getSentRequests = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data, error } = await supabaseAdmin
      .from("connections")
      .select(
        `
        id,
        status,
        created_at,
        receiver:receiver_id (
          id,
          full_name,
          college_name,
          avatar_url,
          tech_stack,
          about_me
        )
      `,
      )
      .eq("sender_id", userId)
      .eq("status", "pending")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return res.status(200).json({
      success: true,
      requests: data,
    });
  } catch (error) {
    console.error("Get sent requests error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const acceptConnectionRequest = async (req, res) => {
  try {
    const receiverId = req.user.id;
    const { connectionId } = req.params;

    const { data: connection, error: fetchError } = await supabaseAdmin
      .from("connections")
      .select("*")
      .eq("id", connectionId)
      .eq("receiver_id", receiverId)
      .eq("status", "pending")
      .single();

    if (fetchError || !connection) {
      return res.status(404).json({
        success: false,
        message: "Pending request not found",
      });
    }

    const { error: updateError } = await supabaseAdmin
      .from("connections")
      .update({
        status: "accepted",
        updated_at: new Date().toISOString(),
      })
      .eq("id", connectionId);

    if (updateError) throw updateError;

    const { user1_id, user2_id } = getConversationUsers(
      connection.sender_id,
      connection.receiver_id,
    );

    const { data: conversation, error: conversationError } = await supabaseAdmin
      .from("conversations")
      .upsert(
        {
          user1_id,
          user2_id,
          last_message: null,
          last_message_at: null,
        },
        {
          onConflict: "user1_id,user2_id",
        },
      )
      .select()
      .single();

    if (conversationError) throw conversationError;

    const { data: receiverProfile } = await supabaseAdmin
      .from("profiles")
      .select("full_name")
      .eq("id", receiverId)
      .single();

    await supabaseAdmin.from("notifications").insert({
      user_id: connection.sender_id,
      type: "connection_accepted",
      title: "Connection accepted",
      message: `${receiverProfile?.full_name || "Someone"} accepted your connection request`,
      metadata: {
        connection_id: connection.id,
        conversation_id: conversation.id,
        receiver_id: receiverId,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Connection accepted successfully",
      conversation,
    });
  } catch (error) {
    console.error("Accept connection error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const rejectConnectionRequest = async (req, res) => {
  try {
    const receiverId = req.user.id;
    const { connectionId } = req.params;

    const { data: connection, error: fetchError } = await supabaseAdmin
      .from("connections")
      .select("*")
      .eq("id", connectionId)
      .eq("receiver_id", receiverId)
      .eq("status", "pending")
      .single();

    if (fetchError || !connection) {
      return res.status(404).json({
        success: false,
        message: "Pending request not found",
      });
    }

    const { error } = await supabaseAdmin
      .from("connections")
      .update({
        status: "rejected",
        updated_at: new Date().toISOString(),
      })
      .eq("id", connectionId);

    if (error) throw error;

    const { data: receiverProfile } = await supabaseAdmin
      .from("profiles")
      .select("full_name")
      .eq("id", receiverId)
      .single();

    await supabaseAdmin.from("notifications").insert({
      user_id: connection.sender_id,
      type: "connection_rejected",
      title: "Connection rejected",
      message: `${receiverProfile?.full_name || "Someone"} rejected your connection request, Next connection after 60 days.`,
      metadata: {
        connection_id: connection.id,
        receiver_id: receiverId,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Connection rejected",
    });
  } catch (error) {
    console.error("Reject connection error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const removeSentRequest = async (req, res) => {
  try {
    const senderId = req.user.id;
    const { connectionId } = req.params;

    const { error } = await supabaseAdmin
      .from("connections")
      .delete()
      .eq("id", connectionId)
      .eq("sender_id", senderId)
      .eq("status", "pending");

    if (error) throw error;

    return res.status(200).json({
      success: true,
      message: "Connection request removed",
    });
  } catch (error) {
    console.error("Remove sent request error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
