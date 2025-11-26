export type TaskStatus = 'TODO' | 'DOING' | 'DONE'

export interface Task {
  id: string
  title: string
  description: string | null
  status: TaskStatus
  created_at: string
  updated_at: string
}

export interface CreateTaskInput {
  title: string
  description?: string
  status?: TaskStatus
}

export interface UpdateTaskInput {
  title?: string
  description?: string
  status?: TaskStatus
}
