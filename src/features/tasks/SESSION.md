# SESSION.md

## Last Session
**Date:** November 23, 2025
**Goal:** Plan multi-page routing and database connection

---

## Project Status

### Completed
- ✅ Vite + React + TypeScript project setup
- ✅ Playwright MCP installed
- ✅ Deployed to Vercel: https://task-tracker-azure-ten.vercel.app/
- ✅ Global agent (CLAUDE.md) created
- ✅ Tasks sub-agent created with full spec
- ✅ TaskForm component built and tested
- ✅ GitHub repo: https://github.com/JR-BEI/task-tracker

### Planned (Ready to Build)
- 🔲 React Router setup (3 pages)
- 🔲 Supabase database connection
- 🔲 NavBar component
- 🔲 TaskCard with status buttons
- 🔲 TaskBoard (3 columns)
- 🔲 TaskDetailPage (edit form)
- 🔲 DashboardPage (stats)
- 🔲 Modal for new task

---

## Architecture Decided

### Pages
| Page | Route | Purpose |
|------|-------|---------|
| Home | `/` | Task board with 3 columns |
| Task Detail | `/tasks/:id` | View & edit single task |
| Dashboard | `/dashboard` | Stats and progress |

### Database (Supabase)
```sql
tasks
├── id (uuid, primary key)
├── title (text, required)
├── description (text, optional)
├── status ('TODO' | 'DOING' | 'DONE')
├── created_at (timestamp)
└── updated_at (timestamp)
```

### UX Decisions
- Status changes directly on cards (quick)
- New task via modal (don't leave page)
- Edit task on separate detail page
- Delete only on detail page with confirm
- Optimistic updates for status changes

---

## Next Session: Build Order

### Phase 1: Routing & Layout
1. Install React Router
2. Create page components (empty shells)
3. Create NavBar with links
4. Verify navigation works

### Phase 2: Supabase Setup
1. Create Supabase project
2. Create tasks table
3. Install Supabase client
4. Create API helper functions
5. Test connection

### Phase 3: Build Components
1. TaskCard (with status buttons)
2. TaskColumn
3. TaskBoard
4. Wire up to Supabase

### Phase 4: Detail Page
1. TaskDetailPage with edit form
2. Save/Delete functionality
3. Back navigation

### Phase 5: Dashboard
1. StatCard component
2. ProgressBar component
3. DashboardPage layout
4. Wire up stats

### Phase 6: Polish
1. Loading states (skeletons)
2. Error handling
3. Modal for new task
4. Playwright tests

---

## Commands

```bash
# Start dev server
npm run dev

# Run Playwright tests
npx playwright test

# View test report
npx playwright show-report

# Check MCP status
claude mcp list
```

---

## How to Start

Open Claude Code:
```bash
cd ~/projects/task-tracker
claude
```

Then say:
```
Read CLAUDE.md and SESSION.md, and the tasks sub-agent at src/features/tasks/CLAUDE.md. 

Let's start Phase 1: Install React Router and create the basic page structure with NavBar. Follow the routes defined in the sub-agent.
```