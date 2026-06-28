import { FaEdit, FaTrash, FaCalendarAlt } from "react-icons/fa";
import api from "../api/axios";
import toast from "react-hot-toast";

function TaskCard({ task, fetchTasks,setEditingTask }) {
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Delete this task?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/tasks/${task._id}`);

      toast.success("Task deleted");

      fetchTasks();
    } catch (error) {
      console.error(error);
      toast.error("Delete failed");
    }
  };

  const getPriorityBadgeClass = (priority) => {
    switch (priority) {
      case "Low":
        return "badge-priority-low";
      case "Medium":
        return "badge-priority-medium";
      case "High":
        return "badge-priority-high";
      default:
        return "badge-priority-low";
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Pending":
        return "badge-status-pending";
      case "In Progress":
        return "badge-status-in-progress";
      case "Completed":
        return "badge-status-completed";
      default:
        return "badge-status-pending";
    }
  };

  return (
    <div className="task-card">
      <div className="task-card-header">

        <div className="task-content">
          <h3 className="task-title">
            {task.title}
          </h3>

          <p className="task-description">
            {task.description}
          </p>
        </div>

        <div className="task-actions">

        <button
  onClick={() => setEditingTask(task)}
  className="btn btn-icon btn-icon-edit"
>
  <FaEdit />
</button>

          <button
            onClick={handleDelete}
            className="btn btn-icon btn-icon-delete"
          >
            <FaTrash />
          </button>

        </div>

      </div>

      <div className="task-badges">

        <span className={`badge ${getPriorityBadgeClass(task.priority)}`}>
          {task.priority}
        </span>

        <span className={`badge ${getStatusBadgeClass(task.status)}`}>
          {task.status}
        </span>

      </div>

      <div className="task-date">
        <FaCalendarAlt />

        <span>
  {task.dueDate
    ? new Date(task.dueDate).toLocaleDateString()
    : "No due date"}
</span>
      </div>
    </div>
  );
}

export default TaskCard;