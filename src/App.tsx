import './App.css'
import { TaskForm } from './features/tasks'

function App() {
  const handleTaskSubmit = (title: string) => {
    console.log('New task submitted:', title)
  }

  return (
    <div className="app">
      <h1>Task Tracker</h1>
      <TaskForm onSubmit={handleTaskSubmit} />
    </div>
  )
}

export default App
