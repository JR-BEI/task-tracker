import { Link } from 'react-router-dom'
import './NavBar.css'

interface NavBarProps {
  onNewTaskClick: () => void
}

export function NavBar({ onNewTaskClick }: NavBarProps) {
  return (
    <nav data-testid="nav-bar" className="nav-bar">
      <div className="nav-links">
        <Link to="/" data-testid="nav-board-link">
          Board
        </Link>
        <Link to="/dashboard" data-testid="nav-dashboard-link">
          Dashboard
        </Link>
      </div>
      <button
        data-testid="nav-new-task-btn"
        className="new-task-btn"
        onClick={onNewTaskClick}
      >
        + New Task
      </button>
    </nav>
  )
}
