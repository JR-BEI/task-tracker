import type { Task, TaskStatus } from '../types/task'
import { TaskCard } from './TaskCard'
import './TaskColumn.css'
import { useDroppable } from '@dnd-kit/core'

interface TaskColumnProps {
  status: TaskStatus
  tasks: Task[]
  onStatusChange: (id: string, status: TaskStatus) => void
}

const statusLabels: Record<TaskStatus, string> = {
  TODO: 'To Do',
  DOING: 'In Progress',
  DONE: 'Done',
}

const statusTestIds: Record<TaskStatus, string> = {
  TODO: 'column-todo',
  DOING: 'column-doing',
  DONE: 'column-done',
}

export function TaskColumn({ status, tasks, onStatusChange }: TaskColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  })

  return (
    <div
      ref={setNodeRef}
      data-testid={statusTestIds[status]}
      className={`task-column task-column-${status.toLowerCase()} ${
        isOver ? 'task-column-over' : ''
      }`}
    >
      <div className="task-column-header">
        <h2>{statusLabels[status]}</h2>
        <span className="task-count">{tasks.length}</span>
      </div>

      <div className="task-column-content">
        {tasks.length === 0 ? (
          <p className="empty-message">No tasks</p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onStatusChange={onStatusChange}
            />
          ))
        )}
      </div>
    </div>
  )
}
