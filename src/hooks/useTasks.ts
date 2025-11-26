import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { supabase } from '../lib/supabase'
import type { Task, CreateTaskInput, UpdateTaskInput } from '../types/task'

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTasks()
  }, [])

  async function fetchTasks() {
    try {
      setLoading(true)
      setError(null)

      const { data, error: fetchError } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError

      setTasks(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tasks')
      console.error('Error fetching tasks:', err)
    } finally {
      setLoading(false)
    }
  }

  async function createTask(input: CreateTaskInput): Promise<Task | null> {
    try {
      setError(null)

      const { data, error: createError } = await supabase
        .from('tasks')
        .insert([
          {
            title: input.title,
            description: input.description || null,
            status: input.status || 'TODO',
          },
        ])
        .select()
        .single()

      if (createError) throw createError

      if (data) {
        setTasks((prev) => [data, ...prev])
        toast.success('Task created successfully!')
      }

      return data
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create task'
      setError(message)
      toast.error(message)
      console.error('Error creating task:', err)
      return null
    }
  }

  async function updateTask(
    id: string,
    input: UpdateTaskInput
  ): Promise<Task | null> {
    try {
      setError(null)

      const { data, error: updateError } = await supabase
        .from('tasks')
        .update(input)
        .eq('id', id)
        .select()
        .single()

      if (updateError) throw updateError

      if (data) {
        setTasks((prev) =>
          prev.map((task) => (task.id === id ? data : task))
        )
        toast.success('Task updated successfully!')
      }

      return data
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update task'
      setError(message)
      toast.error(message)
      console.error('Error updating task:', err)
      return null
    }
  }

  async function deleteTask(id: string): Promise<boolean> {
    try {
      setError(null)

      const { error: deleteError } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id)

      if (deleteError) throw deleteError

      setTasks((prev) => prev.filter((task) => task.id !== id))
      toast.success('Task deleted successfully!')

      return true
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete task'
      setError(message)
      toast.error(message)
      console.error('Error deleting task:', err)
      return false
    }
  }

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
  }
}
