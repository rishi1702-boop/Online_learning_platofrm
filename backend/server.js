import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { connect } from 'mongoose';
import cookieParser from 'cookie-parser';
import { userRouter } from './APIs/userAPI.js';
import { instructorRouter } from './APIs/instructorAPI.js';
import { authRouter } from './APIs/commonAPI.js';
import { adminRouter } from './APIs/adminAPI.js';
import { startupRouter } from './APIs/startupAPI.js';

config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://online-learning-platform-livid.vercel.app",
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (
      allowedOrigins.includes(origin) ||
      allowedOrigins.includes(origin.replace(/\/$/, '')) ||
      origin.endsWith('.vercel.app') ||
      origin.includes('localhost')
    ) {
      return callback(null, true);
    }
    // Allow any origin with credentials for seamless deployment
    return callback(null, true);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
}));

// Health check endpoint for Render monitoring
app.get('/', (req, res) => {
  res.status(200).json({ status: "ok", message: "Online Learning Platform API is live" });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: "healthy", timestamp: new Date().toISOString() });
});

app.use('/user-api', userRouter);
app.use('/instructor-api', instructorRouter);
app.use('/common-api', authRouter);
app.use('/admin-api', adminRouter);
app.use('/startup-api', startupRouter);

const PORT = process.env.PORT || 5000;

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL environment variable is missing!");
    }
    await connect(process.env.MONGO_URL);
    console.log("Database connected successfully");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

  } catch(err) {
    console.error("Database connection error:", err.message);
  }
};

connectDB();