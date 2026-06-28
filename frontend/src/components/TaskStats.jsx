import {
  FaTasks,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
} from "react-icons/fa";

function TaskStats({ tasks }) {
  const total = tasks.length;

  const pending = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const completed = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const highPriority = tasks.filter(
    (task) => task.priority === "High"
  ).length;

  const stats = [
    {
      title: "Total Tasks",
      value: total,
      icon: <FaTasks />,
      colorClass: "stat-icon-blue",
    },
    {
      title: "Pending",
      value: pending,
      icon: <FaClock />,
      colorClass: "stat-icon-yellow",
    },
    {
      title: "Completed",
      value: completed,
      icon: <FaCheckCircle />,
      colorClass: "stat-icon-green",
    },
    {
      title: "High Priority",
      value: highPriority,
      icon: <FaExclamationTriangle />,
      colorClass: "stat-icon-red",
    },
  ];

  return (
    <section className="stats-grid">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="stat-card"
        >
          <div className="stat-info">
            <p className="stat-label">
              {stat.title}
            </p>

            <h2 className="stat-value">
              {stat.value}
            </h2>
          </div>

          <div
            className={`stat-icon-box ${stat.colorClass}`}
          >
            {stat.icon}
          </div>
        </div>
      ))}
    </section>
  );
}

export default TaskStats;