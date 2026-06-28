import Task from "../models/task.model.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createTask = asyncHandler(async (req, res) => {
  const { title, description, status, priority, dueDate } = req.body;

if (!title.trim()) {
  res.status(400);
  throw new Error("Task title is required");
}

  const task = await Task.create({
    title,
    description,
    status,
    priority,
    dueDate,
  });

  res.status(201).json({
    success: true,
    message: "Task created successfully",
    data: task,
  });
});

export const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks,
  });
});

export const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      returnDocument: "after",
      runValidators: true,
    }
  );

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  res.status(200).json({
    success: true,
    message: "Task updated successfully",
    data: task,
  });
});

export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  await task.deleteOne();

res.status(200).json({
  success: true,
  message: "Task deleted successfully",
  data: null,
});
});

export const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  res.status(200).json({
    success: true,
    data: task,
  });
});