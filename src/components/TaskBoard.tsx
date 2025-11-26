import { useTasksContext } from '../contexts/TasksContext'
import type { TaskStatus } from '../types/task'
import { TaskColumn } from './TaskColumn'
import './TaskBoard.css'

export function TaskBoard() {
  const { tasks, loading, error, updateTask } = useTasksContext()

  const handleStatusChange = async (id: string, status: TaskStatus) => {
    await updateTask(id, { status })
  }

  const tasksByStatus = {
    TODO: tasks.filter((task) => task.status === 'TODO'),
    DOING: tasks.filter((task) => task.status === 'DOING'),
    DONE: tasks.filter((task) => task.status === 'DONE'),
  }

  if (loading) {
    return (
      <div data-testid="task-board" className="task-board">
        <div className="loading-state">
          <p>Loading tasks...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div data-testid="task-board" className="task-board">
        <div className="error-state">
          <p>Error loading tasks: {error}</p>
        </div>
      </div>
    )
  }

  return (
    <div data-testid="task-board" className="task-board">
      <TaskColumn
        status="TODO"
        tasks={tasksByStatus.TODO}
        onStatusChange={handleStatusChange}
      />
      <TaskColumn
        status="DOING"
        tasks={tasksByStatus.DOING}
        onStatusChange={handleStatusChange}
      />
      <TaskColumn
        status="DONE"
        tasks={tasksByStatus.DONE}
        onStatusChange={handleStatusChange}
      />
    </div>
  )
}
