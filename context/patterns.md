# Code Patterns & Best Practices

Common patterns and conventions used in the Task Tracker codebase.

## File Organization

### Directory Structure
```
src/
├── components/       # Shared, reusable UI components
├── features/         # Feature-specific components (domain-driven)
├── contexts/         # React Context providers
├── hooks/            # Custom React hooks
├── lib/              # External service integrations
├── types/            # TypeScript type definitions
├── App.tsx           # Root component
└── main.tsx          # Entry point
```

### Naming Conventions

**Files**:
- Components: `PascalCase.tsx` (e.g., `TaskCard.tsx`)
- Hooks: `camelCase.ts` with `use` prefix (e.g., `useTasks.ts`)
- Types: `camelCase.ts` (e.g., `task.ts`)
- CSS: Match component name (e.g., `TaskCard.css`)

**Variables & Functions**:
```typescript
// Components - PascalCase
export function TaskCard() {}

// Hooks - camelCase with 'use' prefix
export function useTasks() {}

// Functions - camelCase
async function fetchTasks() {}

// Constants - SCREAMING_SNAKE_CASE
const API_ENDPOINT = '/api/tasks'

// Types/Interfaces - PascalCase
interface Task {}
type TaskStatus = 'TODO' | 'DOING' | 'DONE'
```

---

## React Patterns

### Component Structure

**Standard Component Pattern**:
```typescript
import { useState } from 'react'
import './ComponentName.css'

interface ComponentNameProps {
  required: string
  optional?: number
}

export function ComponentName({ required, optional }: ComponentNameProps) {
  // 1. Hooks (state, context, custom hooks)
  const [state, setState] = useState()

  // 2. Derived state
  const computed = useMemo(() => {}, [state])

  // 3. Event handlers
  const handleClick = () => {}

  // 4. Effects
  useEffect(() => {}, [])

  // 5. Early returns (loading, error states)
  if (loading) return <Spinner />

  // 6. Render
  return (
    <div className="component-name">
      {/* JSX */}
    </div>
  )
}
```

### Props Pattern

**Always define props interface**:
```typescript
// ✅ Good
interface TaskCardProps {
  task: Task
  onStatusChange?: (status: TaskStatus) => void
}

export function TaskCard({ task, onStatusChange }: TaskCardProps) {}

// ❌ Bad - inline types
export function TaskCard({ task, onStatusChange }: {
  task: Task,
  onStatusChange?: (status: TaskStatus) => void
}) {}
```

### State Management

**Local State** (useState):
```typescript
// Simple component state
const [isEditing, setIsEditing] = useState(false)
const [formData, setFormData] = useState({ title: '', description: '' })
```

**Context State** (React Context):
```typescript
// Global app state
const { tasks, loading, error, createTask, updateTask } = useTasksContext()
```

**When to use which**:
- **useState**: Component-local state (UI state, form inputs)
- **Context**: Shared state across multiple components (tasks, user data)

---

## TypeScript Patterns

### Type Definitions

**Domain Types** (`src/types/task.ts`):
```typescript
// Base entity
export interface Task {
  id: string
  title: string
  description: string | null
  status: TaskStatus
  created_at: string
  updated_at: string
}

// Status enum (union type)
export type TaskStatus = 'TODO' | 'DOING' | 'DONE'

// Input types for API operations
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
```

**Component Props**:
```typescript
// Use interface for component props
interface ComponentProps {
  required: string
  optional?: number
  callback: (data: string) => void
  children?: ReactNode
}
```

### Type Guards

```typescript
// Check if value exists
if (task) {
  // TypeScript knows task is not null here
}

// Array filtering with type safety
const doneTasks = tasks.filter(t => t.status === 'DONE')
```

---

## Async Patterns

### API Calls (Supabase)

**Standard Pattern**:
```typescript
async function fetchData() {
  try {
    setLoading(true)
    setError(null)

    const { data, error: fetchError } = await supabase
      .from('tasks')
      .select('*')

    if (fetchError) throw fetchError

    setData(data || [])
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Unknown error')
    console.error('Error:', err)
  } finally {
    setLoading(false)
  }
}
```

### Error Handling

**Toast Notifications**:
```typescript
import toast from 'react-hot-toast'

// Success
toast.success('Task created successfully!')

// Error
toast.error('Failed to create task')

// Custom
toast('Custom message', { icon: '🎉' })
```

---

## CSS Patterns

### Class Naming (BEM-like)

```css
/* Block */
.task-card {}

/* Element */
.task-card-title {}
.task-card-description {}
.task-card-actions {}

/* Modifier */
.task-card.dragging {}
.status-btn.active {}
```

### Hover & Focus States

```css
.element {
  transition: all 0.2s ease;
}

.element:hover {
  /* Hover state */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.element:focus,
.element:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}
```

### Responsive Design

```css
/* Mobile-first approach */
.component {
  padding: 1rem;
}

/* Tablet */
@media (min-width: 768px) {
  .component {
    padding: 2rem;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .component {
    padding: 3rem;
  }
}
```

---

## Testing Patterns

### Test IDs

**Always add `data-testid` for interactive elements**:
```tsx
// Buttons
<button data-testid="submit-btn">Submit</button>

// Forms
<form data-testid="task-form">
  <input data-testid="task-title-input" />
</form>

// Containers
<div data-testid="task-card-{task.id}">
  {/* Content */}
</div>
```

### Playwright Selectors

```typescript
// Get by test ID
page.getByTestId('submit-btn')

// Get by role
page.getByRole('button', { name: 'Submit' })

// Get by text
page.getByText('Loading...')

// Get by label
page.getByLabel('Task Title')
```

---

## Context Pattern

### Creating Context

```typescript
// 1. Define context type
interface MyContextType {
  data: Data[]
  loading: boolean
  fetchData: () => Promise<void>
}

// 2. Create context
const MyContext = createContext<MyContextType | undefined>(undefined)

// 3. Create provider
export function MyProvider({ children }: { children: ReactNode }) {
  const contextValue = useMyData() // Custom hook

  return (
    <MyContext.Provider value={contextValue}>
      {children}
    </MyContext.Provider>
  )
}

// 4. Create hook for consuming context
export function useMyContext() {
  const context = useContext(MyContext)
  if (context === undefined) {
    throw new Error('useMyContext must be used within MyProvider')
  }
  return context
}
```

### Using Context

```typescript
// In App.tsx
<MyProvider>
  <App />
</MyProvider>

// In components
const { data, loading, fetchData } = useMyContext()
```

---

## Custom Hooks Pattern

### Hook Structure

```typescript
export function useMyHook() {
  // 1. State
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 2. Effects
  useEffect(() => {
    fetchData()
  }, [])

  // 3. Functions
  async function fetchData() {
    // Implementation
  }

  // 4. Return object
  return {
    data,
    loading,
    error,
    fetchData,
  }
}
```

---

## Form Patterns

### Controlled Inputs

```typescript
const [title, setTitle] = useState('')
const [description, setDescription] = useState('')

<input
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  placeholder="Task title"
/>
```

### Form Submission

```typescript
async function handleSubmit(e: FormEvent) {
  e.preventDefault()

  // Validation
  if (!title.trim()) {
    toast.error('Title is required')
    return
  }

  // Submit
  try {
    await onSubmit(title, description)
    // Reset form
    setTitle('')
    setDescription('')
  } catch (err) {
    toast.error('Failed to submit')
  }
}
```

---

## Import Order

```typescript
// 1. React & external libraries
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

// 2. Internal modules
import { useTasksContext } from '../../contexts/TasksContext'
import { TaskForm } from '../../components'

// 3. Types
import type { Task, TaskStatus } from '../../types/task'

// 4. Styles
import './Component.css'
```

---

## Barrel Exports

**Use index.ts for clean imports**:

```typescript
// src/components/index.ts
export { TaskCard } from './TaskCard'
export { TaskColumn } from './TaskColumn'
export { TaskBoard } from './TaskBoard'

// Usage
import { TaskCard, TaskColumn, TaskBoard } from './components'
```

---

## Performance Patterns

### Memoization

```typescript
// Expensive computation
const stats = useMemo(() => {
  return calculateStats(tasks)
}, [tasks])

// Callback stability
const handleClick = useCallback(() => {
  doSomething(value)
}, [value])
```

### Lazy Loading

```typescript
// Code splitting
const DashboardPage = lazy(() => import('./DashboardPage'))

// Usage
<Suspense fallback={<Spinner />}>
  <DashboardPage />
</Suspense>
```
