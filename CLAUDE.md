# Task Tracker - Project Documentation

**A modern task management application built with React, TypeScript, and Supabase**

---

## 🎯 Project Overview

Task Tracker is a Kanban-style task management application that helps users organize work across three states: TODO, DOING, and DONE. Features include drag-and-drop functionality, real-time updates, and a dashboard for progress tracking.

### Key Features
- ✅ Create, read, update, delete tasks (CRUD)
- 🎯 Three-state workflow (TODO → DOING → DONE)
- 🎨 Drag & drop task cards between columns
- 📊 Dashboard with statistics and progress tracking
- 💾 Persistent storage with Supabase
- 🎨 Clean, modern UI with smooth animations
- 📱 Responsive design

---

## 🛠️ Tech Stack

### Core
- **Framework**: React 19.2.0
- **Language**: TypeScript 5.9.3
- **Build Tool**: Vite 7.2.4
- **Routing**: React Router DOM 7.9.6

### UI & Interactions
- **Drag & Drop**: @dnd-kit (core, sortable, utilities)
- **Notifications**: react-hot-toast
- **Styling**: Pure CSS (no framework)

### Backend & Data
- **Database**: Supabase (PostgreSQL)
- **Client**: @supabase/supabase-js

### Development
- **Testing**: Playwright (E2E)
- **Linting**: ESLint 9.39.1
- **Type Checking**: TypeScript strict mode

---

## 📁 Project Structure

```
task-tracker/
├── src/
│   ├── components/           # Shared UI components
│   │   ├── ErrorMessage.tsx
│   │   ├── Modal.tsx
│   │   ├── NavBar.tsx
│   │   ├── NewTaskModal.tsx
│   │   ├── Spinner.tsx
│   │   ├── TaskBoard.tsx    # Kanban board
│   │   ├── TaskCard.tsx     # Individual task card
│   │   ├── TaskColumn.tsx   # Board column
│   │   ├── TaskEditForm.tsx
│   │   └── index.ts         # Barrel exports
│   │
│   ├── features/tasks/       # Task feature domain
│   │   ├── DashboardPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── TaskDetailPage.tsx
│   │   ├── TaskForm.tsx
│   │   └── index.ts
│   │
│   ├── contexts/             # React Context
│   │   └── TasksContext.tsx  # Global tasks state
│   │
│   ├── hooks/                # Custom hooks
│   │   ├── useTasks.ts       # Task operations
│   │   └── index.ts
│   │
│   ├── lib/                  # External services
│   │   └── supabase.ts       # Supabase client
│   │
│   ├── types/                # TypeScript types
│   │   └── task.ts           # Task domain types
│   │
│   ├── App.tsx               # Root component
│   ├── main.tsx              # Entry point
│   └── index.css             # Global styles
│
├── context/                  # Claude Code context files
│   ├── api.md                # API reference
│   ├── components.md         # Component library
│   ├── design-tokens.md      # Design system
│   └── patterns.md           # Code patterns
│
├── .claude/                  # Claude Code settings
├── package.json
├── tsconfig.json
├── vite.config.ts
└── CLAUDE.md                 # This file
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/task-tracker.git
cd task-tracker

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Supabase credentials

# Run development server
npm run dev
```

### Environment Variables

Create a `.env` file:
```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run preview      # Preview production build
npm run test:e2e     # Run Playwright tests
npm run test:e2e:ui  # Run tests with UI
```

---

## 🎨 Design System

### Color Palette
- **Primary**: `#007bff` (Blue)
- **Text**: `#213547` (Dark gray)
- **Background**: Linear gradient (`#f5f7fa` → `#c3cfe2`)
- **Cards**: `#ffffff` (White)
- **Borders**: `#e0e0e0` (Light gray)

### Status Colors
- **TODO**: `#ffc107` (Yellow)
- **DOING**: `#17a2b8` (Blue)
- **DONE**: `#28a745` (Green)

### Spacing Scale
- `xs`: 6px
- `sm`: 8px
- `md`: 12px
- `lg`: 16px
- `xl`: 32px

### Typography
- **Font**: system-ui, Avenir, Helvetica, Arial
- **Sizes**: 12px, 14px, 16px, 20px, 24px, 32px
- **Weights**: 400 (normal), 500 (medium), 600 (semibold)

**📖 Full design tokens**: See `/context/design-tokens.md`

---

## 🧩 Core Concepts

### Task State Machine

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

**Note**: Tasks can transition between any states (flexible workflow).

### Data Model

```typescript
interface Task {
  id: string                // UUID
  title: string             // Required
  description: string | null
  status: 'TODO' | 'DOING' | 'DONE'
  created_at: string        // ISO timestamp
  updated_at: string        // ISO timestamp
}
```

### Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | HomePage | Kanban board view |
| `/tasks/:id` | TaskDetailPage | View/edit single task |
| `/dashboard` | DashboardPage | Statistics & progress |

---

## 🏗️ Architecture

### State Management

**Global State** (React Context):
- Tasks array
- Loading states
- Error states
- CRUD operations

**Local State** (useState):
- UI state (modals, editing)
- Form inputs
- Component-specific state

### Data Flow

```
Component
   ↓
useTasksContext()
   ↓
useTasks() hook
   ↓
Supabase API
   ↓
PostgreSQL Database
```

### Component Hierarchy

```
App
├── NavBar
├── Routes
│   ├── HomePage
│   │   └── TaskBoard
│   │       └── TaskColumn (×3)
│   │           └── TaskCard (×N)
│   │
│   ├── TaskDetailPage
│   │   └── TaskEditForm
│   │
│   └── DashboardPage
│       └── StatCard (×4)
│
└── NewTaskModal
    └── TaskForm
```

---

## 📚 Documentation

### Context Files

All detailed documentation is in `/context/`:

1. **[components.md](./context/components.md)**
   - Complete component API reference
   - Props interfaces
   - Usage examples
   - Test IDs

2. **[design-tokens.md](./context/design-tokens.md)**
   - Colors, spacing, typography
   - Shadows, borders, transitions
   - CSS variable definitions

3. **[patterns.md](./context/patterns.md)**
   - Code conventions
   - React patterns
   - TypeScript patterns
   - Best practices

4. **[api.md](./context/api.md)**
   - Supabase integration
   - API operations
   - Data schemas
   - Error handling

---

## 🔌 API Integration

### Supabase Setup

**Database Table**:
```sql
create table tasks (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  status text not null default 'TODO',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
```

**Key Operations**:
```typescript
const { tasks, createTask, updateTask, deleteTask } = useTasksContext()

// Create
await createTask({ title: 'New Task', status: 'TODO' })

// Update
await updateTask(taskId, { status: 'DONE' })

// Delete
await deleteTask(taskId)
```

**📖 Full API docs**: See `/context/api.md`

---

## 🧪 Testing

### E2E Tests (Playwright)

```bash
# Run all tests
npm run test:e2e

# Run with UI
npm run test:e2e:ui
```

### Test IDs Convention

All interactive elements have `data-testid`:
```tsx
<button data-testid="submit-btn">Submit</button>
<div data-testid="task-card-{id}">Task</div>
```

**Common Test IDs**:
- `nav-new-task-btn` - New task button
- `task-title-input` - Title input field
- `status-btn-done` - Mark as done button
- `delete-confirm-btn` - Delete confirmation

---

## 🎯 Key Features Implementation

### Drag & Drop

**Library**: @dnd-kit

**Implementation**: `TaskBoard.tsx`
```typescript
<DndContext onDragEnd={handleDragEnd}>
  <TaskColumn status="TODO">
    {todoTasks.map(task => (
      <TaskCard key={task.id} task={task} />
    ))}
  </TaskColumn>
</DndContext>
```

### Toast Notifications

**Library**: react-hot-toast

**Usage**:
```typescript
import toast from 'react-hot-toast'

toast.success('Task created!')
toast.error('Failed to update task')
```

### Routing

**Library**: react-router-dom

**Setup**:
```typescript
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/tasks/:id" element={<TaskDetailPage />} />
  <Route path="/dashboard" element={<DashboardPage />} />
</Routes>
```

---

## 🐛 Common Issues & Solutions

### Issue: 404 on Task Detail Page Refresh

**Problem**: Refreshing `/tasks/:id` shows 404

**Cause**: Task not in context state on page load

**Solution**: `fetchTask(id)` fetches directly from database
```typescript
// TaskDetailPage.tsx checks context first, then fetches
if (!foundTask) {
  foundTask = await fetchTask(id)
}
```

### Issue: Stale Task Data

**Problem**: UI shows old data after update

**Cause**: State not updated after API call

**Solution**: `updateTask()` updates local state
```typescript
setTasks(prev => prev.map(t => t.id === id ? updatedTask : t))
```

---

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

Output: `dist/` directory

### Environment Variables

Set these in your deployment platform:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

---

## 🔒 Security Considerations

1. **Row Level Security (RLS)**: Not implemented - tasks are public
2. **Authentication**: Not implemented - anonymous access
3. **Environment Variables**: Never commit `.env` file
4. **API Keys**: Use Supabase anon key (public, restricted by RLS)

**⚠️ TODO for Production**:
- Add authentication (Supabase Auth)
- Enable RLS policies
- Add user-specific task filtering

---

## 🛣️ Roadmap

### Planned Features
- [ ] User authentication
- [ ] Task search & filtering
- [ ] Task categories/tags
- [ ] Due dates
- [ ] Task priority
- [ ] Dark mode
- [ ] Mobile app (React Native)

### Performance Improvements
- [ ] Optimistic updates
- [ ] Real-time sync (Supabase Realtime)
- [ ] Pagination for large task lists
- [ ] Service worker for offline support

---

## 📖 Additional Resources

### Internal Documentation
- [Component Library](./context/components.md)
- [Design Tokens](./context/design-tokens.md)
- [Code Patterns](./context/patterns.md)
- [API Reference](./context/api.md)

### External Links
- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [@dnd-kit Docs](https://docs.dndkit.com)
- [Vite Docs](https://vitejs.dev)

---

## 🤝 Contributing

### Code Style
- Use TypeScript strict mode
- Follow existing naming conventions
- Add test IDs to interactive elements
- Write meaningful commit messages

### Pull Request Process
1. Create feature branch: `git checkout -b feature/my-feature`
2. Make changes and test
3. Commit: `git commit -m "feat: add my feature"`
4. Push: `git push origin feature/my-feature`
5. Open pull request

---

## 📝 License

[Your License Here]

---

## 📧 Contact

[Your Contact Information]

---

**Last Updated**: December 2025

**Version**: 1.0.0

**Claude Code Compatible**: ✅ Yes - Full context files included
