import { createContext, useContext } from 'react'
import type { ReactNode } from 'react'
import { useTasks } from '../hooks'
import type { Task, CreateTaskInput, UpdateTaskInput } from '../types/task'

interface TasksContextType {
  tasks: Task[]
  loading: boolean
  error: string | null
  fetchTasks: () => Promise<void>
  fetchTask: (id: string) => Promise<Task | null>
  createTask: (input: CreateTaskInput) => Promise<Task | null>
  updateTask: (id: string, input: UpdateTaskInput) => Promise<Task | null>
  deleteTask: (id: string) => Promise<boolean>
}

const TasksContext = createContext<TasksContextType | undefined>(undefined)

export function TasksProvider({ children }: { children: ReactNode }) {
  const tasksData = useTasks()

  return (
    <TasksContext.Provider value={tasksData}>
      {children}
    </TasksContext.Provider>
  )
}

export function useTasksContext() {
  const context = useContext(TasksContext)
  if (context === undefined) {
    throw new Error('useTasksContext must be used within a TasksProvider')
  }
  return context
}
