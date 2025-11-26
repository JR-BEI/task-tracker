import { useTasksContext } from '../contexts/TasksContext'
import type { TaskStatus } from '../types/task'
import { TaskColumn } from './TaskColumn'
import './TaskBoard.css'
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import { useState } from 'react'
import { TaskCard } from './TaskCard'

export function TaskBoard() {
  const { tasks, loading, error, updateTask } = useTasksContext()
  const [activeId, setActiveId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  const handleStatusChange = async (id: string, status: TaskStatus) => {
    await updateTask(id, { status })
  }

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)

    if (!over) return

    const taskId = active.id as string
    const newStatus = over.id as TaskStatus

    if (newStatus === 'TODO' || newStatus === 'DOING' || newStatus === 'DONE') {
      handleStatusChange(taskId, newStatus)
    }
  }

  const handleDragCancel = () => {
    setActiveId(null)
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

  const activeTask = activeId ? tasks.find((task) => task.id === activeId) : null

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
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
      <DragOverlay>
        {activeTask ? (
          <div className="task-card-overlay">
            <TaskCard task={activeTask} onStatusChange={() => {}} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
