import express from "express";
import noteRouter from "./routes/NotesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimit.js";
import cors from "cors";
import path from "path";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();
const __dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "production") {
    app.use(
        cors({
            origin: ["http://localhost:5173"],
        })
    );
}

app.use(rateLimiter);

app.use((req, res, next) => {
    console.log(`Request method is ${req.method}`);
    next();
});

app.use("/api/notes", noteRouter);

connectDB();

if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server Started on Port ${PORT}`);
    });
}

export default app;