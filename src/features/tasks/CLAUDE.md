# CLAUDE.md - Tasks Feature (Sub-Agent)

> This agent handles the tasks domain. For shared components, see `/src/components/`.

## Domain Overview
A **Task** is something the user needs to do. Tasks have a title, optional description, and a status.

## Task State Machine

```
     ┌──────────┐
     │   TODO   │ ← New tasks start here
     └────┬─────┘
          │ start()
          ▼
     ┌──────────┐
     │  DOING   │ ← Work in progress
     └────┬─────┘
          │ complete()
          ▼
     ┌──────────┐
     │   DONE   │ ← Finished
     └──────────┘
```

Any state can transition to any other state (flexible workflow).

## Data Types

```typescript
interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  created_at: string;   // ISO timestamp
  updated_at: string;   // ISO timestamp
}

type TaskStatus = 'TODO' | 'DOING' | 'DONE';

// For creating new tasks
interface CreateTaskInput {
  title: string;
  description?: string;
}

// For updating tasks
interface UpdateTaskInput {
  title?: string;
  description?: string;
  status?: TaskStatus;
}
```

## Business Rules
- Title is required (min 1 character)
- Description is optional (max 500 characters)
- New tasks always start as TODO
- Status can change to any other status (TODO ↔ DOING ↔ DONE)
- Deleting a task requires confirmation

---

## Pages & Routes

| Page | Route | Component | Purpose |
|------|-------|-----------|---------|
| Home | `/` | `HomePage` | Task board with 3 columns |
| Task Detail | `/tasks/:id` | `TaskDetailPage` | View & edit single task |
| Dashboard | `/dashboard` | `DashboardPage` | Stats and progress |

## Page Layouts

### Home Page (/)
```
┌─────────────────────────────────────────────────────────┐
│  [Board]   [Dashboard]                   [+ New Task]   │
├─────────────────────────────────────────────────────────┤
│   TODO            DOING            DONE                 │
│  ┌──────────┐   ┌──────────┐    ┌──────────┐           │
│  │ Task 1   │   │ Task 3   │    │ Task 5   │           │
│  │[T][D][✓] →│   │[T][D][✓] →│    │[T][D][✓] →│          │
│  └──────────┘   └──────────┘    └──────────┘           │
└─────────────────────────────────────────────────────────┘

[T] = TODO button, [D] = DOING button, [✓] = DONE button
→ = Click to view detail
```

### Task Detail Page (/tasks/:id)
```
┌─────────────────────────────────────────────────────────┐
│  ← Back                                    [Delete]     │
├─────────────────────────────────────────────────────────┤
│  Title: [________________________]                      │
│                                                         │
│  Description:                                           │
│  [______________________________________________]       │
│                                                         │
│  Status:  ○ TODO   ● DOING   ○ DONE                    │
│                                                         │
│                              [Save Changes]             │
└─────────────────────────────────────────────────────────┘
```

### Dashboard Page (/dashboard)
```
┌─────────────────────────────────────────────────────────┐
│  [Board]   [Dashboard]                   [+ New Task]   │
├─────────────────────────────────────────────────────────┤
│   ┌─────────┐  ┌─────────┐  ┌─────────┐                │
│   │    3    │  │    2    │  │    5    │                │
│   │   TODO  │  │  DOING  │  │   DONE  │                │
│   └─────────┘  └─────────┘  └─────────┘                │
│                                                         │
│   Total Tasks: 10          Completion Rate: 50%         │
│                                                         │
│   ┌─────────────────────────────────────┐              │
│   │ ████████████░░░░░░░░░░             │ Progress     │
│   └─────────────────────────────────────┘              │
└─────────────────────────────────────────────────────────┘
```

---

## UI Components

### Shared (in /src/components/)
| Component | Purpose |
|-----------|---------|
| `NavBar` | Top navigation with links to Board, Dashboard, and New Task button |
| `Modal` | Reusable modal wrapper for New Task form |

### Feature-Specific (in /src/features/tasks/)
| Component | Purpose |
|-----------|---------|
| `TaskForm` | Create/edit task form (used in modal and detail page) |
| `TaskCard` | Single task card with status buttons and detail link |
| `TaskColumn` | Column of tasks for a single status |
| `TaskBoard` | 3-column kanban board |
| `StatCard` | Single stat display (count + label) |
| `ProgressBar` | Visual progress indicator |

---

## Test IDs

### Navigation
- `nav-bar` - Navigation container
- `nav-board-link` - Link to home/board
- `nav-dashboard-link` - Link to dashboard
- `nav-new-task-btn` - Button to open new task modal

### Task Form
- `task-form` - Form element
- `task-title-input` - Title input field
- `task-description-input` - Description textarea
- `task-submit-btn` - Submit button
- `task-cancel-btn` - Cancel button (in modal)

### Task Card
- `task-card` - Card container
- `task-card-{id}` - Specific card by task ID
- `task-card-title` - Title text
- `task-status-todo-btn` - Set status to TODO
- `task-status-doing-btn` - Set status to DOING  
- `task-status-done-btn` - Set status to DONE
- `task-detail-link` - Link to detail page

### Task Board
- `task-board` - Board container
- `task-column-todo` - TODO column
- `task-column-doing` - DOING column
- `task-column-done` - DONE column

### Task Detail Page
- `task-detail-page` - Page container
- `task-back-btn` - Back to board button
- `task-delete-btn` - Delete task button
- `task-save-btn` - Save changes button
- `task-status-radio-todo` - Status radio TODO
- `task-status-radio-doing` - Status radio DOING
- `task-status-radio-done` - Status radio DONE

### Dashboard
- `dashboard-page` - Page container
- `stat-card-todo` - TODO count card
- `stat-card-doing` - DOING count card
- `stat-card-done` - DONE count card
- `stat-total` - Total tasks count
- `stat-completion-rate` - Completion percentage
- `progress-bar` - Visual progress bar

### Modal
- `modal-overlay` - Modal backdrop
- `modal-content` - Modal container
- `modal-close-btn` - Close modal button

---

## Supabase Schema

```sql
-- tasks table
create table tasks (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  status text not null default 'TODO' check (status in ('TODO', 'DOING', 'DONE')),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Auto-update updated_at
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

---

## API Functions (Supabase Client)

```typescript
// Fetch all tasks
async function getTasks(): Promise<Task[]>

// Fetch single task
async function getTask(id: string): Promise<Task | null>

// Create task
async function createTask(input: CreateTaskInput): Promise<Task>

// Update task
async function updateTask(id: string, input: UpdateTaskInput): Promise<Task>

// Delete task
async function deleteTask(id: string): Promise<void>

// Get stats
async function getTaskStats(): Promise<{
  todo: number;
  doing: number;
  done: number;
  total: number;
  completionRate: number;
}>
```

---

## UX Patterns

### Optimistic Updates
When user changes status on a card:
1. Update UI immediately
2. Send request to Supabase
3. If fails → revert UI + show error toast

### Loading States
- Board: Show skeleton cards while loading
- Detail page: Show skeleton form while loading
- Dashboard: Show skeleton stat cards while loading

### Error Handling
- Network error → Toast with retry option
- Not found → Redirect to home with message
- Validation error → Inline field errors

### Navigation
- Browser back button always works
- ← Back button on detail page goes to home
- After delete → redirect to home
- After create → close modal, new task appears in TODO column