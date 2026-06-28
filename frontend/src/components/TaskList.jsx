import TaskCard from "./TaskCard";

function TaskList({ tasks, fetchTasks, setEditingTask, }) {
  return (
    <div className="tasks-section">
      <h2 className="tasks-title">
        Tasks
      </h2>

      {tasks.length === 0 ? (
        <div className="empty-state">
  <h3 className="empty-state-title">
    No Tasks Found
  </h3>

  <p className="empty-state-description">
    Create your first task to get started.
  </p>
</div>
      ) : (
        <div className="tasks-grid">
          {tasks.map((task) => (
<TaskCard
  key={task._id}
  task={task}
  fetchTasks={fetchTasks}
  setEditingTask={setEditingTask}
/>         ))}
        </div>
      )}
    </div>
  );
}

export default TaskList;