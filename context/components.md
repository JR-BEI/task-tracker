# Component Library

Complete reference of all components in the Task Tracker application.

## Shared Components (`/src/components/`)

### ErrorMessage
**Location**: `src/components/ErrorMessage.tsx`
**Purpose**: Display error messages to users

**Props**:
```typescript
interface ErrorMessageProps {
  message: string
}
```

**Usage**:
```tsx
<ErrorMessage message="Failed to load tasks" />
```

**Styling**: `ErrorMessage.css`

---

### Modal
**Location**: `src/components/Modal.tsx`
**Purpose**: Generic modal wrapper for overlays

**Props**:
```typescript
interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}
```

**Usage**:
```tsx
<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
  <ModalContent />
</Modal>
```

**Features**:
- Click outside to close
- Escape key to close
- Backdrop overlay
- Center-aligned content

**Test IDs**:
- `modal-overlay` - Modal backdrop
- `modal-content` - Modal container
- `modal-close-btn` - Close button

**Styling**: `Modal.css`

---

### NavBar
**Location**: `src/components/NavBar.tsx`
**Purpose**: Top navigation bar

**Props**:
```typescript
interface NavBarProps {
  onNewTaskClick: () => void
}
```

**Features**:
- Navigation links (Board, Dashboard)
- New Task button
- Responsive layout

**Test IDs**:
- `nav-bar` - Navigation container
- `nav-board-link` - Link to home/board
- `nav-dashboard-link` - Link to dashboard
- `nav-new-task-btn` - Button to open new task modal

**Styling**: `NavBar.css`

---

### NewTaskModal
**Location**: `src/components/NewTaskModal.tsx`
**Purpose**: Modal for creating new tasks

**Props**:
```typescript
interface NewTaskModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (title: string, description: string, status: TaskStatus) => Promise<void>
}
```

**Features**:
- Wraps TaskForm in a Modal
- Handles form submission
- Closes on success

**Usage**:
```tsx
<NewTaskModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  onSubmit={handleCreateTask}
/>
```

**Styling**: `NewTaskModal.css`

---

### Spinner
**Location**: `src/components/Spinner.tsx`
**Purpose**: Loading indicator

**Props**: None

**Usage**:
```tsx
{loading && <Spinner />}
```

**Styling**: `Spinner.css` (animated spinner)

---

### TaskBoard
**Location**: `src/components/TaskBoard.tsx`
**Purpose**: 3-column Kanban board layout

**Props**:
```typescript
interface TaskBoardProps {
  tasks: Task[]
}
```

**Features**:
- Drag & drop support (@dnd-kit)
- 3 columns: TODO, DOING, DONE
- Automatic task filtering by status
- Drag overlay for visual feedback

**Test IDs**:
- `task-board` - Board container
- `task-column-todo` - TODO column
- `task-column-doing` - DOING column
- `task-column-done` - DONE column

**Styling**: `TaskBoard.css`

---

### TaskCard
**Location**: `src/components/TaskCard.tsx`
**Purpose**: Individual task card display

**Props**:
```typescript
interface TaskCardProps {
  task: Task
}
```

**Features**:
- Draggable (@dnd-kit)
- Status buttons (T, D, ✓)
- Click title to view details
- Shows description if present
- Hover effects

**Test IDs**:
- `task-card` - Card container
- `task-card-{id}` - Specific card by ID
- `task-card-title` - Title text
- `status-btn-todo` - TODO button
- `status-btn-doing` - DOING button
- `status-btn-done` - DONE button
- `task-detail-link` - Link to detail page

**Styling**: `TaskCard.css`

---

### TaskColumn
**Location**: `src/components/TaskColumn.tsx`
**Purpose**: Single column in task board

**Props**:
```typescript
interface TaskColumnProps {
  title: string
  status: TaskStatus
  count: number
  children: ReactNode
  badgeColor?: string
}
```

**Features**:
- Droppable zone (@dnd-kit)
- Header with count badge
- Visual feedback on drag over

**Usage**:
```tsx
<TaskColumn
  title="To Do"
  status="TODO"
  count={todoTasks.length}
  badgeColor="#ffc107"
>
  {todoTasks.map(task => <TaskCard key={task.id} task={task} />)}
</TaskColumn>
```

**Styling**: `TaskColumn.css`

---

### TaskEditForm
**Location**: `src/components/TaskEditForm.tsx`
**Purpose**: Edit existing task inline

**Props**:
```typescript
interface TaskEditFormProps {
  task: Task
  onSave: (title: string, description: string, status: TaskStatus) => Promise<void>
  onCancel: () => void
}
```

**Features**:
- Pre-filled with task data
- Status radio buttons
- Save/Cancel actions
- Validation

**Styling**: `TaskEditForm.css`

---

## Feature Components (`/src/features/tasks/`)

### TaskForm
**Location**: `src/features/tasks/TaskForm.tsx`
**Purpose**: Form for creating new tasks

**Props**:
```typescript
interface TaskFormProps {
  onSubmit: (title: string, description: string, status: TaskStatus) => Promise<void>
  onCancel?: () => void
}
```

**Features**:
- Title input (required)
- Description textarea (optional)
- Status dropdown (defaults to TODO)
- Validation
- Loading states

**Test IDs**:
- `task-form` - Form element
- `task-title-input` - Title input field
- `task-description-input` - Description textarea
- `task-submit-btn` - Submit button
- `task-cancel-btn` - Cancel button

**Styling**: `TaskForm.css`

---

### HomePage
**Location**: `src/features/tasks/HomePage.tsx`
**Purpose**: Main board view page

**Features**:
- Displays TaskBoard
- Shows loading/error states
- Route: `/`

---

### TaskDetailPage
**Location**: `src/features/tasks/TaskDetailPage.tsx`
**Purpose**: View and edit single task

**Features**:
- Fetches task from context or database
- View mode and edit mode
- Delete confirmation modal
- Back to board link
- Route: `/tasks/:id`

**Test IDs**:
- `task-detail-page` - Page container
- `back-link` - Back button
- `edit-btn` - Edit button
- `delete-btn` - Delete button
- `delete-confirm` - Delete modal
- `delete-confirm-btn` - Confirm delete button

**Styling**: `TaskDetailPage.css`

---

### DashboardPage
**Location**: `src/features/tasks/DashboardPage.tsx`
**Purpose**: Statistics and progress view

**Features**:
- Task counts by status
- Total tasks
- Completion percentage
- Progress bar
- Route: `/dashboard`

**Test IDs**:
- `dashboard-page` - Page container
- `stat-card-todo` - TODO count
- `stat-card-doing` - DOING count
- `stat-card-done` - DONE count
- `stat-total` - Total count
- `stat-completion-rate` - Percentage
- `progress-bar` - Visual progress

**Styling**: `DashboardPage.css`

---

## Component Patterns

### Barrel Exports
Components export from `index.ts`:
```typescript
// src/components/index.ts
export { ErrorMessage } from './ErrorMessage'
export { Modal } from './Modal'
export { NavBar } from './NavBar'
// ...
```

### CSS Naming
Each component has a corresponding CSS file:
- Component: `TaskCard.tsx`
- Styles: `TaskCard.css`

### Test IDs
Use `data-testid` for all interactive elements:
```tsx
<button data-testid="delete-btn">Delete</button>
```

### Props Pattern
Always define props interface:
```typescript
interface MyComponentProps {
  required: string
  optional?: number
}

export function MyComponent({ required, optional }: MyComponentProps) {
  // ...
}
```
