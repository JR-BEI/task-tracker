import { useState } from 'react'
import type { Task, TaskStatus } from '../types/task'
import './TaskEditForm.css'

interface TaskEditFormProps {
  task: Task
  onSave: (title: string, description: string, status: TaskStatus) => Promise<void>
  onCancel: () => void
}

export function TaskEditForm({ task, onSave, onCancel }: TaskEditFormProps) {
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description || '')
  const [status, setStatus] = useState<TaskStatus>(task.status)
  const [isSaving, setIsSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) return

    setIsSaving(true)
    try {
      await onSave(title.trim(), description.trim(), status)
    } catch (error) {
      console.error('Error saving task:', error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form data-testid="edit-form" className="task-edit-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="edit-title">
          Title <span className="required">*</span>
        </label>
        <input
          id="edit-title"
          data-testid="edit-title-input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          required
          maxLength={200}
        />
      </div>

      <div className="form-group">
        <label htmlFor="edit-description">Description</label>
        <textarea
          id="edit-description"
          data-testid="edit-description-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description (optional)"
          rows={6}
          maxLength={500}
        />
      </div>

      <div className="form-group">
        <label htmlFor="edit-status">Status</label>
        <select
          id="edit-status"
          data-testid="edit-status-select"
          value={status}
          onChange={(e) => setStatus(e.target.value as TaskStatus)}
        >
          <option value="TODO">To Do</option>
          <option value="DOING">In Progress</option>
          <option value="DONE">Done</option>
        </select>
      </div>

      <div className="form-actions">
        <button
          type="button"
          data-testid="edit-cancel-btn"
          onClick={onCancel}
          disabled={isSaving}
          className="btn-cancel"
        >
          Cancel
        </button>
        <button
          type="submit"
          data-testid="edit-save-btn"
          disabled={!title.trim() || isSaving}
          className="btn-save"
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  )
}
