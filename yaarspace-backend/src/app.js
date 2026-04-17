import express from 'express'
import cors from 'cors';
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
  })
)

app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'YaarSpace API is running...' });
});

app.get('/api/test', (req, res) => {
  res.json({ success: true, message: 'API working for frontend' });
});

export default app;