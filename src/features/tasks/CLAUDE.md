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

Any state can go back to TODO via `reset()`.

## Data Types
```typescript
interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
}

type TaskStatus = 'TODO' | 'DOING' | 'DONE';
```

## Business Rules
- Title is required (min 1 character)
- Description is optional (max 500 characters)
- New tasks always start as TODO
- Tasks can move: TODO → DOING → DONE
- Any task can reset to TODO

## UI Components (to build)

| Component | Purpose |
|-----------|---------|
| TaskForm | Create new tasks |
| TaskCard | Display single task |
| TaskList | Display list of tasks by status |
| TaskBoard | Kanban-style board with 3 columns |

## Test IDs
- `task-form` - the new task form
- `task-title-input` - title input field
- `task-submit-btn` - form submit button
- `task-card` - individual task card
- `task-card-{id}` - specific task by ID
- `task-status-btn` - status change button