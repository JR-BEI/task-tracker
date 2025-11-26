import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { NavBar, NewTaskModal } from './components'
import { HomePage, TaskDetailPage, DashboardPage } from './features/tasks'
import { TasksProvider, useTasksContext } from './contexts/TasksContext'
import './App.css'

function AppContent() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { createTask } = useTasksContext()

  const handleCreateTask = async (
    title: string,
    description: string,
    status: 'TODO' | 'DOING' | 'DONE'
  ) => {
    await createTask({ title, description, status })
  }

  return (
    <div className="app">
      <Toaster position="top-right" />
      <NavBar onNewTaskClick={() => setIsModalOpen(true)} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tasks/:id" element={<TaskDetailPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </main>
      <NewTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateTask}
      />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <TasksProvider>
        <AppContent />
      </TasksProvider>
    </BrowserRouter>
  )
}

export default App
