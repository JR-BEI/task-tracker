import { Link } from 'react-router-dom'
import { useTasksContext } from '../../contexts/TasksContext'
import './DashboardPage.css'

export function DashboardPage() {
  const { tasks, loading } = useTasksContext()

  const stats = {
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'TODO').length,
    doing: tasks.filter(t => t.status === 'DOING').length,
    done: tasks.filter(t => t.status === 'DONE').length,
  }

  const completionRate = stats.total > 0
    ? Math.round((stats.done / stats.total) * 100)
    : 0

  if (loading) {
    return (
      <div data-testid="dashboard-page" className="dashboard-page">
        <h1>Dashboard</h1>
        <p className="loading-message">Loading stats...</p>
      </div>
    )
  }

  if (stats.total === 0) {
    return (
      <div data-testid="dashboard-page" className="dashboard-page">
        <h1>Dashboard</h1>
        <div data-testid="dashboard-empty" className="empty-state">
          <p className="empty-message">No tasks yet!</p>
          <p className="empty-subtitle">
            Start by creating your first task to see your progress here.
          </p>
          <Link to="/" className="empty-link">
            Go to Board →
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div data-testid="dashboard-page" className="dashboard-page">
      <h1>Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card stat-card-total" data-testid="stat-total">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total Tasks</div>
        </div>

        <div className="stat-card stat-card-todo" data-testid="stat-todo">
          <div className="stat-value">{stats.todo}</div>
          <div className="stat-label">To Do</div>
        </div>

        <div className="stat-card stat-card-doing" data-testid="stat-doing">
          <div className="stat-value">{stats.doing}</div>
          <div className="stat-label">In Progress</div>
        </div>

        <div className="stat-card stat-card-done" data-testid="stat-done">
          <div className="stat-value">{stats.done}</div>
          <div className="stat-label">Done</div>
        </div>
      </div>

      <div className="progress-section">
        <div className="progress-header">
          <h2>Completion Progress</h2>
          <span className="progress-percentage">{completionRate}%</span>
        </div>
        <div data-testid="stat-progress" className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${completionRate}%` }}
          />
        </div>
        <p className="progress-text">
          {stats.done} of {stats.total} tasks completed
        </p>
      </div>
    </div>
  )
}
