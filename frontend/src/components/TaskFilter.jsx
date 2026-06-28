import { FaSearch } from "react-icons/fa";

function TaskFilter({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
}) {
  return (
    <div className="filter-container">
      <div className="filter-grid">

        {/* Search */}
        <div className="filter-group">
          <label className="filter-label">Search</label>
          <div className="search-input-wrapper">
            <FaSearch className="search-icon" />

            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-input search-input"
            />
          </div>
        </div>

        {/* Status */}
        <div className="filter-group">
          <label className="filter-label">All Statuses</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="form-select"
          >
            <option>All</option>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>

        {/* Priority */}
        <div className="filter-group">
          <label className="filter-label">All Priorities</label>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="form-select"
          >
            <option>All</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

      </div>
    </div>
  );
}

export default TaskFilter;