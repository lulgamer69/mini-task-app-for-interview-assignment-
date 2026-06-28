import { FaTasks } from "react-icons/fa";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo-section">
          <div className="navbar-logo">
            <FaTasks />
          </div>

          <div>
            <h1 className="navbar-title">
              Task Tracker
            </h1>
            <p className="navbar-subtitle">
              Manage your daily tasks
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;