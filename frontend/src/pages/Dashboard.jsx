import { useEffect, useState } from "react";

import api from "../api/axios";

import Navbar from "../components/Navbar";
import TaskStats from "../components/TaskStats";
import TaskForm from "../components/TaskForm";
import TaskFilter from "../components/TaskFilter";
import TaskList from "../components/TaskList";
import Loader from "../components/Loader";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState(null);
  const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] = useState("All");
const [priorityFilter, setPriorityFilter] = useState("All");



  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
  try {
    setLoading(true);

    const response = await api.get("/tasks");

    setTasks(response.data.data);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
}


const filteredTasks = tasks.filter((task) => {
  const matchesSearch =
    task.title.toLowerCase().includes(search.toLowerCase()) ||
    task.description.toLowerCase().includes(search.toLowerCase());

  const matchesStatus =
    statusFilter === "All" || task.status === statusFilter;

  const matchesPriority =
    priorityFilter === "All" || task.priority === priorityFilter;

  return matchesSearch && matchesStatus && matchesPriority;
});




  return (
    <div className="dashboard">
      <Navbar />

      <main className="main-container">

        <TaskStats tasks={tasks} />
<TaskForm
  fetchTasks={fetchTasks}
  editingTask={editingTask}
  setEditingTask={setEditingTask}
/>
<TaskFilter
  search={search}
  setSearch={setSearch}
  statusFilter={statusFilter}
  setStatusFilter={setStatusFilter}
  priorityFilter={priorityFilter}
  setPriorityFilter={setPriorityFilter}
/>
{loading ? (
  <Loader />
) : (
  <TaskList
    tasks={filteredTasks}
    fetchTasks={fetchTasks}
    setEditingTask={setEditingTask}
  />
)}     </main>
    </div>
  );
}

export default Dashboard;