import { Link } from 'react-router-dom'
import type { Task, TaskStatus } from '../types/task'
import './TaskCard.css'

interface TaskCardProps {
  task: Task
  onStatusChange: (id: string, status: TaskStatus) => void
}

export function TaskCard({ task, onStatusChange }: TaskCardProps) {
  const truncateDescription = (text: string | null, maxLength: number = 100) => {
    if (!text) return ''
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text
  }

  return (
    <div data-testid="task-card" data-task-id={task.id} className="task-card">
      <Link to={`/tasks/${task.id}`} className="task-card-title">
        <h3>{task.title}</h3>
      </Link>

      {task.description && (
        <p className="task-card-description">
          {truncateDescription(task.description)}
        </p>
      )}

      <div className="task-card-actions">
        <button
          data-testid="status-btn-todo"
          className={`status-btn ${task.status === 'TODO' ? 'active' : ''}`}
          onClick={() => onStatusChange(task.id, 'TODO')}
          aria-label="Mark as TODO"
        >
          T
        </button>
        <button
          data-testid="status-btn-doing"
          className={`status-btn ${task.status === 'DOING' ? 'active' : ''}`}
          onClick={() => onStatusChange(task.id, 'DOING')}
          aria-label="Mark as DOING"
        >
          D
        </button>
        <button
          data-testid="status-btn-done"
          className={`status-btn ${task.status === 'DONE' ? 'active' : ''}`}
          onClick={() => onStatusChange(task.id, 'DONE')}
          aria-label="Mark as DONE"
        >
          ✓
        </button>
      </div>
    </div>
  )
}
