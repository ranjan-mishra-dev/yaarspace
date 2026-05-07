import supabaseAdmin from "../db/supabaseClient.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: No1 token" });
    }

    const token = authHeader.split(" ")[1];
    const { data, error } = await supabaseAdmin.auth.getUser(token);

    if (error || !data?.user) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    req.user = data.user;

    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default authMiddleware;