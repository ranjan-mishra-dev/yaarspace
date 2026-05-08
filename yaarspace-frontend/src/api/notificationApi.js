// src/api/notificationApi.js
import axios from "axios";
import { supabase } from "@/services/supabaseClient";

const API_URL = "https://yaarspace-backend.onrender.com/api/notifications";

const authHeader = async () => {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getNotificationsApi = async () => {
  const config = await authHeader();
  const res = await axios.get(API_URL, config);
  return res.data;
};

export const markNotificationReadApi = async (notificationId) => {
  const config = await authHeader();
  const res = await axios.patch(`${API_URL}/${notificationId}/read`, {}, config);
  return res.data;
};