import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import taskRoutes from "./routes/task.routes.js";
import notFound from "./middleware/notFound.js";
import errorMiddleware from "./middleware/errorMiddleware.js";


const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
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