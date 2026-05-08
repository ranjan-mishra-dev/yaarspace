import axios from "axios";
import { supabase } from "@/services/supabaseClient";

const API_URL = "https://yaarspace-backend.onrender.com/api/connections";

const getToken = async () => {
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token;
};

const authHeader = async () => {
  const token = await getToken();

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const sendConnectionRequestApi = async (receiverId) => {
  const config = await authHeader();
  const res = await axios.post(`${API_URL}/send/${receiverId}`, {}, config);
  return res.data;
};

export const getReceivedRequestsApi = async () => {
  const config = await authHeader();
  const res = await axios.get(`${API_URL}/received`, config);
  // console.log("getReceivedRequestsApi2 ", config)
  return res.data;
};

export const getSentRequestsApi = async () => {
  const config = await authHeader();
  const res = await axios.get(`${API_URL}/sent`, config);
  return res.data;
};

export const acceptConnectionApi = async (connectionId) => {
  const config = await authHeader();
  const res = await axios.patch(`${API_URL}/accept/${connectionId}`, {}, config);
  return res.data;
};

export const rejectConnectionApi = async (connectionId) => {
  const config = await authHeader();
  const res = await axios.patch(`${API_URL}/reject/${connectionId}`, {}, config);
  return res.data;
};

export const removeSentRequestApi = async (connectionId) => {
  const config = await authHeader();
  const res = await axios.delete(`${API_URL}/remove/${connectionId}`, config);
  return res.data;
};