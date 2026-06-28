import { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

function TaskForm({ fetchTasks,editingTask,setEditingTask, }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Pending",
    priority: "Medium",
    dueDate: "",
  });
   useEffect(() => {
  if (editingTask) {
    setFormData({
      title: editingTask.title,
      description: editingTask.description,
      status: editingTask.status,
      priority: editingTask.priority,
      dueDate: editingTask.dueDate
        ? editingTask.dueDate.split("T")[0]
        : "",
    });
  }
}, [editingTask]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (editingTask) {
      await api.put(`/tasks/${editingTask._id}`, formData);

      toast.success("Task updated!");

      setEditingTask(null);
    } else {
      await api.post("/tasks", formData);

      toast.success("Task created!");
    }

    setFormData({
      title: "",
      description: "",
      status: "Pending",
      priority: "Medium",
      dueDate: "",
    });

    fetchTasks();
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong.");
  }
};

  return (
    <div className="form-container">
<h2 className="form-title">
  {editingTask ? "Edit Task" : "Add New Task"}
</h2>
      <form onSubmit={handleSubmit} className="form-content">

        <div className="form-group">
          <label className="form-label">Task Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter task title"
            value={formData.title}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            placeholder="Enter task description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            className="form-textarea"
          />
        </div>

        <div className="form-row">

          <div className="form-group">
            <label className="form-label">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="form-select"
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="form-select"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="form-input"
            />
          </div>

        </div>

<div className="form-actions">
  <button
    type="submit"
    className="btn btn-primary"
  >
    {editingTask ? "Update Task" : "Add Task"}
  </button>

  {editingTask && (
    <button
      type="button"
      onClick={() => {
        setEditingTask(null);
        setFormData({
          title: "",
          description: "",
          status: "Pending",
          priority: "Medium",
          dueDate: "",
        });
      }}
      className="btn btn-secondary"
    >
      Cancel
    </button>
  )}
</div>

      </form>
    </div>
  );
}

export default TaskForm;