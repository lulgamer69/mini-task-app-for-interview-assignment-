import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import taskRoutes from "./routes/task.routes.js";
import notFound from "./middleware/notFound.js";
import errorMiddleware from "./middleware/errorMiddleware.js";


const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL,
];

app.use(
  cors({
    origin(origin, callback) {
      // Allow requests with no Origin (health checks, curl, etc.)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/v1/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("Task Tracker API Running...");
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running",
  });
});

app.use(notFound);
app.use(errorMiddleware);
export default app;