import 'dotenv/config';

import express from 'express'
import cors from 'cors';
import http from 'http';

import connectionRoutes from "./routes/connection.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import searchPeople from './routes/search.routes.js'
import { Server } from 'socket.io';

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
  })
)

app.use(express.json());

const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("join_conversation", (conversationId) => {
    socket.join(conversationId);
  });

  socket.on("leave_conversation", (conversationId) => {
    socket.leave(conversationId);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});


app.use('/api/search', searchPeople);
app.use("/api/connections", connectionRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/chat", chatRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'YaarSpace API is running...' });
});

app.get('/api/test', (req, res) => {
  res.json({ success: true, message: 'API working for frontend' });
});

// server.listen(5000, () => {
//   console.log("Server running on port 5000");
// });
export default server;