import { useEffect, useState, useRef } from "react";
import {
  getConversationsApi,
  getMessagesApi,
  sendMessageApi,
  markMessagesReadApi,
  editMessageApi,
  deleteMessageForEveryoneApi,
} from "@/api/chatApi";

import { socket } from "@/services/socket";
import { useAuth } from "@/context/AuthProvider";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Send, Search, Check, CheckCheck, Trash2, Pencil } from "lucide-react";
import { toast } from "sonner";

const Chat = () => {
  const { user } = useAuth();

  const [search, setSearch] = useState("");
  const [totalConnections, setTotalConnections] = useState(0);
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [activeUser, setActiveUser] = useState(null);

  const scrollRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const [editingMessage, setEditingMessage] = useState(null);

  const fetchConversations = async () => {
    const res = await getConversationsApi(search);
    setConversations(res.conversations || []);
    setTotalConnections(res.totalConnections || 0);
  };

  const openConversation = async (conversation) => {
    setActiveConversation(conversation);
    setActiveUser(conversation.otherUser);

    const res = await getMessagesApi(conversation.id);
    setMessages(res.messages || []);

    await markMessagesReadApi(conversation.id);
    fetchConversations();

    socket.emit("join_conversation", conversation.id);
  };

  useEffect(() => {
    fetchConversations();
  }, [search]);

  useEffect(() => {
    socket.connect();

    socket.on("receive_message", (newMessage) => {
      if (activeConversation?.id === newMessage.conversation_id) {
        setMessages((prev) => [...prev, newMessage]);
        markMessagesReadApi(newMessage.conversation_id);
      }

      fetchConversations();
    });

    socket.on("message_edited", (updatedMessage) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === updatedMessage.id ? updatedMessage : msg
        )
      );
    });

    socket.on("message_deleted", (deletedMessage) => {
      setMessages((prev) =>
        prev.filter((msg) => msg.id !== deletedMessage.id)
      );
    });

    socket.on("conversation_updated", () => {
      fetchConversations();
    });

    return () => {
      socket.off("receive_message");
      socket.off("message_edited");
      socket.off("message_deleted");
      socket.off("conversation_updated");
      socket.disconnect();
    };
  }, [activeConversation]);

  const handleSend = async () => {
    if (!text.trim() || !activeConversation) return;

    try {
      if (editingMessage) {
        await editMessageApi(editingMessage.id, text);
        setEditingMessage(null);
        setText("");
        return;
      }

      await sendMessageApi(activeConversation.id, text);
      setText("");
    } catch (error) {
      toast.error("Failed to send message");
    }
  };

  const handleEdit = (message) => {
    setEditingMessage(message);
    setText(message.message);
  };

  const handleDelete = async (messageId) => {
    try {
      await deleteMessageForEveryoneApi(messageId);
      toast.success("Message deleted");
    } catch (error) {
      toast.error("Failed to delete message");
    }
  };

  useEffect(() => {
  if (scrollRef.current) {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }
}, [messages]);

  return (
    <div className="min-h-screen bg-[#FDFCF0] p-6">
      <div className="mx-auto grid h-[85vh] max-w-7xl grid-cols-1 overflow-hidden rounded-3xl border bg-white shadow-sm md:grid-cols-[380px_1fr]">

        <aside className="border-r bg-white">
          <div className="border-b p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-[#064E3B]">Chats</h1>
                <p className="text-sm text-[#475569]">
                  {totalConnections} connections
                </p>
              </div>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-[#475569]" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search connected people..."
                className="rounded-xl pl-10"
              />
            </div>
          </div>

          <div className="h-[calc(85vh-130px)] overflow-y-auto">
            {conversations.length === 0 ? (
              <p className="p-6 text-center text-sm text-[#475569]">
                No connected people found.
              </p>
            ) : (
              conversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => openConversation(conversation)}
                  className={`flex w-full gap-4 border-b p-4 text-left transition hover:bg-[#FDFCF0] ${
                    activeConversation?.id === conversation.id
                      ? "bg-[#FDFCF0]"
                      : "bg-white"
                  }`}
                >
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={conversation.otherUser?.avatar_url} />
                    <AvatarFallback>
                      {conversation.otherUser?.full_name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="truncate font-semibold text-slate-950">
                        {conversation.otherUser?.full_name}
                      </h3>

                      {conversation.last_message_at && (
                        <span className="text-xs text-[#475569]">
                          {new Date(
                            conversation.last_message_at
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      )}
                    </div>

                    <p className="truncate text-xs text-[#475569]">
                      {conversation.otherUser?.college_name || "College not added"}
                    </p>

                    <div className="mt-1 flex items-center justify-between gap-2">
                      <p className="truncate text-sm text-[#475569]">
                        {conversation.last_message || "Start conversation"}
                      </p>

                      {conversation.unreadCount > 0 && (
                        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#064E3B] px-1 text-xs text-white">
                          {conversation.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </aside>

        <main className="flex flex-col bg-[#FDFCF0] h-[600px] border">
          {!activeConversation ? (
            <div className="flex flex-1 items-center justify-center">
              <p className="text-[#475569]">
                Select a conversation to start chatting.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-4 border-b bg-white p-5">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={activeUser?.avatar_url} />
                  <AvatarFallback>
                    {activeUser?.full_name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <h2 className="font-bold text-slate-950">
                    {activeUser?.full_name}
                  </h2>
                  <p className="text-sm text-[#475569]">
                    {activeUser?.college_name || "College not added"}
                  </p>
                </div>
              </div>

              <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-6">
                {messages.map((msg) => {
                  const isMine = msg.sender_id === user?.id;

                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isMine ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-2xl px-4 py-3 shadow-sm ${
                          isMine
                            ? "bg-[#064E3B] text-white"
                            : "bg-white text-slate-950"
                        }`}
                      >
                        <p className="text-sm">{msg.message}</p>

                        <div
                          className={`mt-1 flex items-center justify-end gap-2 text-xs ${
                            isMine ? "text-white/70" : "text-[#475569]"
                          }`}
                        >
                          {msg.is_edited && <span>edited</span>}

                          <span>
                            {new Date(msg.created_at).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>

                          {isMine &&
                            (msg.is_read ? (
                              <CheckCheck className="h-4 w-4 text-blue-400" />
                            ) : (
                              <Check className="h-4 w-4" />
                            ))}

                          {isMine && (
                            <div className="ml-2 flex gap-1">
                              <button onClick={() => handleEdit(msg)}>
                                <Pencil className="h-3.5 w-3.5" />
                              </button>

                              <button onClick={() => handleDelete(msg.id)}>
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="border-t bg-white p-4">
                {editingMessage && (
                  <div className="mb-2 flex items-center justify-between rounded-xl bg-[#FDFCF0] px-4 py-2 text-sm text-[#475569]">
                    Editing message
                    <button
                      onClick={() => {
                        setEditingMessage(null);
                        setText("");
                      }}
                      className="font-semibold text-red-500"
                    >
                      Cancel
                    </button>
                  </div>
                )}

                <div className="flex gap-3 mb-2">
                  <Input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSend();
                    }}
                    placeholder="Type your message..."
                    className="rounded-xl"
                  />

                  <Button
                    onClick={handleSend}
                    className="bg-[#064E3B] hover:bg-[#04392B] text-white"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Chat;