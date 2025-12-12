import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useTasksContext } from '../../contexts/TasksContext'
import { TaskEditForm } from '../../components'
import type { Task, TaskStatus } from '../../types/task'
import './TaskDetailPage.css'

export function TaskDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { tasks, fetchTask, updateTask, deleteTask } = useTasksContext()

  const [task, setTask] = useState<Task | null>(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  useEffect(() => {
    async function loadTask() {
      if (!id) return

      setLoading(true)

      // First check if task is in context
      let foundTask = tasks.find(t => t.id === id)

      // If not in context, fetch from database
      if (!foundTask) {
        const fetchedTask = await fetchTask(id)
        foundTask = fetchedTask || undefined
      }

      setTask(foundTask || null)
      setLoading(false)
    }

    loadTask()
  }, [id, tasks, fetchTask])

  const handleSave = async (title: string, description: string, status: TaskStatus) => {
    if (!task) return

    const updated = await updateTask(task.id, { title, description, status })
    if (updated) {
      setTask(updated)
      setIsEditing(false)
    }
  }

  const handleDelete = async () => {
    if (!task) return

    const success = await deleteTask(task.id)
    if (success) {
      navigate('/')
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    })
  }

  if (loading) {
    return (
      <div data-testid="task-detail-page" className="task-detail-page">
        <p className="loading-message">Loading task...</p>
      </div>
    )
  }

  if (!task) {
    return (
      <div data-testid="task-detail-page" className="task-detail-page">
        <div className="not-found">
          <h1>Task Not Found</h1>
          <p>The task you're looking for doesn't exist.</p>
          <Link to="/" data-testid="back-link" className="back-link">
            ← Back to Board
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div data-testid="task-detail-page" className="task-detail-page">
      <div className="detail-header">
        <Link to="/" data-testid="back-link" className="back-link">
          ← Back to Board
        </Link>
        {!isEditing && (
          <div className="header-actions">
            <button
              data-testid="edit-btn"
              onClick={() => setIsEditing(true)}
              className="btn-edit"
            >
              Edit
            </button>
            <button
              data-testid="delete-btn"
              onClick={() => setShowDeleteConfirm(true)}
              className="btn-delete"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {isEditing ? (
        <TaskEditForm
          task={task}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <div data-testid="task-detail" className="task-detail">
          <h1>{task.title}</h1>

          <div className="task-meta">
            <div className="meta-item">
              <span className="meta-label">Status:</span>
              <span className={`status-badge status-${task.status.toLowerCase()}`}>
                {task.status === 'TODO' && 'To Do'}
                {task.status === 'DOING' && 'In Progress'}
                {task.status === 'DONE' && 'Done'}
              </span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Created:</span>
              <span>{formatDate(task.created_at)}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Updated:</span>
              <span>{formatDate(task.updated_at)}</span>
            </div>
          </div>

          {task.description && (
            <div className="task-description">
              <h2>Description</h2>
              <p>{task.description}</p>
            </div>
          )}
        </div>
      )}

      {showDeleteConfirm && (
        <div data-testid="delete-confirm" className="delete-modal-overlay" onClick={() => setShowDeleteConfirm(false)}>
          <div className="delete-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Delete Task?</h2>
            <p>Are you sure you want to delete "{task.title}"? This action cannot be undone.</p>
            <div className="delete-actions">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="btn-cancel"
              >
                Cancel
              </button>
              <button
                data-testid="delete-confirm-btn"
                onClick={handleDelete}
                className="btn-delete-confirm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
