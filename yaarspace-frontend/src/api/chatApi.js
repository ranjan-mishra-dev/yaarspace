import axios from "axios";
import { supabase } from "@/services/supabaseClient";

const API_URL = "https://yaarspace-backend.onrender.com/api/chat";

const authHeader = async () => {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getConversationsApi = async (search = "") => {
  const config = await authHeader();

  const res = await axios.get(`${API_URL}/conversations`, {
    ...config,
    params: { search },
  });

  return res.data;
};

export const getMessagesApi = async (conversationId) => {
  const config = await authHeader();
  const res = await axios.get(`${API_URL}/messages/${conversationId}`, config);
  return res.data;
};

export const sendMessageApi = async (conversationId, message) => {
  const config = await authHeader();

  const res = await axios.post(
    `${API_URL}/messages/${conversationId}`,
    { message },
    config
  );

  return res.data;
};

export const markMessagesReadApi = async (conversationId) => {
  const config = await authHeader();

  const res = await axios.patch(
    `${API_URL}/messages/${conversationId}/read`,
    {},
    config
  );

  return res.data;
};

export const editMessageApi = async (messageId, message) => {
  const config = await authHeader();

  const res = await axios.patch(
    `${API_URL}/messages/${messageId}/edit`,
    { message },
    config
  );

  return res.data;
};

export const deleteMessageForEveryoneApi = async (messageId) => {
  const config = await authHeader();

  const res = await axios.delete(
    `${API_URL}/messages/${messageId}/everyone`,
    config
  );

  return res.data;
};