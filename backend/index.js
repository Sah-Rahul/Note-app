import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import { ConnectDb } from './config/db.js';
dotenv.config();


const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.CLIENT,
    methods: ["GET", "POST","PUT","DELETE"],
    credentials: true,
  })
);

import userRoutes from './routes/user.routes.js'
import noteRoutes from './routes/note.routes.js'

app.use('/api/v1', userRoutes)
app.use('/api/v1', noteRoutes)

app.get("/", (req, res) => {
  res.send("server is running ✅ ...");
});


app.listen(PORT, () => {
  ConnectDb()
  console.log(`server is running on http://localhost:${PORT}`);
});