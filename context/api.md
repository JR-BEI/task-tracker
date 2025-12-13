# API Reference

Complete reference for backend integrations and data operations.

## Supabase Integration

### Setup

**Location**: `src/lib/supabase.ts`

**Configuration**:
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

**Environment Variables** (`.env`):
```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

---

## Database Schema

### Tasks Table

```sql
create table tasks (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  status text not null default 'TODO' check (status in ('TODO', 'DOING', 'DONE')),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Auto-update updated_at trigger
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger tasks_updated_at
  before update on tasks
  for each row
  execute function update_updated_at();
```

**Constraints**:
- `id`: UUID primary key (auto-generated)
- `title`: Required text field
- `description`: Optional text field
- `status`: Must be one of: 'TODO', 'DOING', 'DONE'
- `created_at`: Auto-set on creation
- `updated_at`: Auto-updated on every change

---

## Custom Hook: useTasks

**Location**: `src/hooks/useTasks.ts`

**Overview**:
Central hook for all task-related operations. Handles API calls, state management, and error handling.

### Return Values

```typescript
interface UseTasksReturn {
  tasks: Task[]
  loading: boolean
  error: string | null
  fetchTasks: () => Promise<void>
  fetchTask: (id: string) => Promise<Task | null>
  createTask: (input: CreateTaskInput) => Promise<Task | null>
  updateTask: (id: string, input: UpdateTaskInput) => Promise<Task | null>
  deleteTask: (id: string) => Promise<boolean>
}
```

---

## API Operations

### Fetch All Tasks

**Function**: `fetchTasks()`

**Purpose**: Load all tasks from the database

**Implementation**:
```typescript
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
```

**Returns**: `Promise<void>`

**Updates**: Sets `tasks` state with fetched data

**Error Handling**: Sets `error` state on failure

---

### Fetch Single Task

**Function**: `fetchTask(id: string)`

**Purpose**: Load a specific task by ID

**Implementation**:
```typescript
async function fetchTask(id: string): Promise<Task | null> {
  try {
    setError(null)

    const { data, error: fetchError } = await supabase
      .from('tasks')
      .select('*')
      .eq('id', id)
      .single()

    if (fetchError) throw fetchError

    return data
  } catch (err) {
    console.error('Error fetching task:', err)
    return null
  }
}
```

**Parameters**:
- `id`: UUID of the task

**Returns**: `Promise<Task | null>`
- Returns task object if found
- Returns `null` if not found or on error

**Use Case**: TaskDetailPage on page refresh

---

### Create Task

**Function**: `createTask(input: CreateTaskInput)`

**Purpose**: Create a new task

**Implementation**:
```typescript
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
```

**Parameters**:
```typescript
interface CreateTaskInput {
  title: string           // Required
  description?: string    // Optional
  status?: TaskStatus     // Optional, defaults to 'TODO'
}
```

**Returns**: `Promise<Task | null>`
- Returns created task on success
- Returns `null` on failure

**Side Effects**:
- Adds task to `tasks` state
- Shows success toast
- Shows error toast on failure

---

### Update Task

**Function**: `updateTask(id: string, input: UpdateTaskInput)`

**Purpose**: Update an existing task

**Implementation**:
```typescript
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
```

**Parameters**:
- `id`: UUID of task to update
```typescript
interface UpdateTaskInput {
  title?: string
  description?: string
  status?: TaskStatus
}
```

**Returns**: `Promise<Task | null>`
- Returns updated task on success
- Returns `null` on failure

**Side Effects**:
- Updates task in `tasks` state
- Shows success toast
- Shows error toast on failure
- Auto-updates `updated_at` timestamp (database trigger)

---

### Delete Task

**Function**: `deleteTask(id: string)`

**Purpose**: Delete a task permanently

**Implementation**:
```typescript
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
```

**Parameters**:
- `id`: UUID of task to delete

**Returns**: `Promise<boolean>`
- Returns `true` on success
- Returns `false` on failure

**Side Effects**:
- Removes task from `tasks` state
- Shows success toast
- Shows error toast on failure

**⚠️ Warning**: This operation is permanent and cannot be undone.

---

## Usage Examples

### In Components

```typescript
import { useTasksContext } from '../contexts/TasksContext'

function MyComponent() {
  const { tasks, loading, error, createTask } = useTasksContext()

  // Create a task
  const handleCreate = async () => {
    const task = await createTask({
      title: 'New Task',
      description: 'Task description',
      status: 'TODO'
    })

    if (task) {
      console.log('Created:', task.id)
    }
  }

  // Render
  if (loading) return <Spinner />
  if (error) return <ErrorMessage message={error} />

  return (
    <div>
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  )
}
```

### Error Handling

```typescript
// Automatic error handling with toasts
const task = await createTask({ title: 'Test' })

if (!task) {
  // Error already shown via toast
  // Handle UI cleanup
  return
}

// Success - proceed with task
console.log('Created:', task.id)
```

---

## Data Flow

### Task Creation Flow

```
User Input
   ↓
TaskForm.onSubmit()
   ↓
createTask(input)
   ↓
Supabase.insert()
   ↓
[Success]
   ↓
- Update tasks state
- Show success toast
- Return created task
   ↓
Component updates UI
```

### Task Update Flow

```
User Action
   ↓
Component.handleUpdate()
   ↓
updateTask(id, input)
   ↓
Supabase.update()
   ↓
[Success]
   ↓
- Update task in tasks state
- Show success toast
- Return updated task
   ↓
Component updates UI
```

---

## Error States

### Common Errors

**Network Error**:
```
Error: fetch failed
→ Shows toast: "Failed to [operation] task"
→ Sets error state
```

**Validation Error**:
```
Error: new row for relation "tasks" violates check constraint "tasks_status_check"
→ Shows toast: "Failed to [operation] task"
→ Sets error state
```

**Not Found**:
```
Error: No rows returned
→ Returns null
→ Component handles gracefully
```

---

## Performance Considerations

### Optimistic Updates

Currently, the app fetches fresh data after each operation. For better UX, consider:

```typescript
// Optimistic update pattern
const updatedTask = { ...task, status: 'DONE' }

// Update UI immediately
setTasks(prev => prev.map(t => t.id === id ? updatedTask : t))

// Then sync with backend
try {
  await updateTask(id, { status: 'DONE' })
} catch (err) {
  // Revert on error
  setTasks(prev => prev.map(t => t.id === id ? task : t))
}
```

### Caching

- Tasks are cached in React state
- Fetch only happens on mount
- Individual task fetches check context first

---

## Real-time Updates

Currently not implemented. To add real-time:

```typescript
// Subscribe to changes
const subscription = supabase
  .channel('tasks')
  .on('postgres_changes',
    { event: '*', schema: 'public', table: 'tasks' },
    (payload) => {
      // Handle insert/update/delete
      fetchTasks()
    }
  )
  .subscribe()

// Cleanup
return () => {
  subscription.unsubscribe()
}
```
