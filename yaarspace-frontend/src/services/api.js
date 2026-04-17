const API_BASE_URL = import.meta.env.VITE_API_URL;

export const testAPI = async () => {
  const res = await fetch(`${API_BASE_URL}/api/test`);
  return res.json();
};