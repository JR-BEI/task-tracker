import { useState } from 'react'
import { Modal } from './Modal'
import type { TaskStatus } from '../types/task'
import './NewTaskModal.css'

interface NewTaskModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (title: string, description: string, status: TaskStatus) => Promise<void>
}

export function NewTaskModal({ isOpen, onClose, onSubmit }: NewTaskModalProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState<TaskStatus>('TODO')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) return

    setIsSubmitting(true)
    try {
      await onSubmit(title.trim(), description.trim(), status)
      setTitle('')
      setDescription('')
      setStatus('TODO')
      onClose()
    } catch (error) {
      console.error('Error creating task:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setTitle('')
    setDescription('')
    setStatus('TODO')
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div data-testid="new-task-modal" className="new-task-modal">
        <h2>Create New Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="task-title">
              Title <span className="required">*</span>
            </label>
            <input
              id="task-title"
              data-testid="task-title-input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              required
              maxLength={200}
            />
          </div>

          <div className="form-group">
            <label htmlFor="task-description">Description</label>
            <textarea
              id="task-description"
              data-testid="task-description-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description (optional)"
              rows={4}
              maxLength={500}
            />
          </div>

          <div className="form-group">
            <label htmlFor="task-status">Status</label>
            <select
              id="task-status"
              data-testid="task-status-select"
              value={status}
              onChange={(e) => setStatus(e.target.value as TaskStatus)}
            >
              <option value="TODO">To Do</option>
              <option value="DOING">In Progress</option>
              <option value="DONE">Done</option>
            </select>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              data-testid="task-cancel-btn"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              data-testid="new-task-submit"
              disabled={!title.trim() || isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}
