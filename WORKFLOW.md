# Master Workflow Guide

## Skills Roadmap

### Tier 1: Complete the Stack
| Skill | Why It Matters |
|-------|----------------|
| Auth patterns | Every real app needs users, sessions, protected routes |
| Database design | Relations, migrations, Row Level Security (RLS) |
| API design | REST/GraphQL patterns for when you need a backend |
| CI/CD pipelines | Auto-test, auto-deploy on every push |

### Tier 2: Level Up the UX
| Skill | Why It Matters |
|-------|----------------|
| State management | Zustand, Jotai — for complex app state |
| Animations | Framer Motion — makes apps feel polished |
| Optimistic updates | Makes apps feel instant |
| Offline-first | PWA patterns, local-first data |

### Tier 3: Monetizable Skills
| Skill | Why It Matters |
|-------|----------------|
| Payments | Stripe integration — charge for things |
| AI features | Build AI into your apps (not just use AI to build) |
| Real-time | Websockets, Supabase subscriptions — live updates |
| Email/notifications | Transactional emails, push notifications |

---

## MCP Toolkit

### Currently Connected
| MCP | What It Does |
|-----|--------------|
| GitHub | Issues, PRs, commits |
| Context7 | Up-to-date library docs |
| Perplexity | AI web research |
| Semgrep | Security scanning |
| Linear | Project management |
| Pieces | Long-term memory |
| Playwright | Browser testing |

### Recommended Additions
| MCP | What It Unlocks |
|-----|-----------------|
| Supabase | Direct DB queries, migrations, RLS management |
| Sentry | Error monitoring — see crashes in prod |
| Vercel | Manage deployments, rollbacks, env vars |
| Figma | Design → code pipeline |
| Notion | Documentation, wikis, project specs |

### Nice to Have
| MCP | What It Unlocks |
|-----|-----------------|
| Stripe | Payment management |
| Slack | Notifications, team updates |
| Postmark/Resend | Email sending and tracking |
| Docker | Container management |

---

## The Master Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                        PROJECT LIFECYCLE                        │
└─────────────────────────────────────────────────────────────────┘

┌──────────────┐   ┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│   RESEARCH   │ → │    BUILD     │ → │    TEST      │ → │    SHIP      │
└──────────────┘   └──────────────┘   └──────────────┘   └──────────────┘
       │                  │                  │                  │
       ▼                  ▼                  ▼                  ▼
  • Perplexity       • Context7         • Playwright      • Semgrep
    (research)         (docs)             (E2E tests)       (security)
  • Pieces           • Claude Code       • /test-all       • GitHub
    (past context)     (write code)                          (PR)
                     • Supabase                            • Linear
                       (database)                            (tracking)
                                                           • Vercel
                                                             (deploy)
```

---

## Workflow for Any New Project

### Phase 0: Setup (10 min)
```
1. Create repo on GitHub
2. Scaffold with Vite + React + TypeScript
3. Connect Supabase project
4. Copy .claude/commands folder (your test framework)
5. Update test-config.json for new project
6. Deploy to Vercel
```

### Phase 1: Research
```
Use Perplexity to research [feature/pattern] best practices in 2025.
Use Pieces to recall if I've built something similar before.
```

### Phase 2: Plan
```
Create Linear issues for each feature.
Create GitHub milestones to track progress.
```

### Phase 3: Build (per feature)
```
Use Context7 to get latest docs for [library].
Implement [feature].
Use Supabase MCP to manage database changes.
Commit progress.
```

### Phase 4: Test
```
/test-all
Fix any failures.
```

### Phase 5: Ship
```
Use Semgrep to scan for security issues.
Fix any vulnerabilities.
Create GitHub PR with summary.
Update Linear issue.
Merge and deploy.
```

### Phase 6: Monitor
```
Use Sentry MCP to check for production errors.
Use Vercel MCP to monitor performance.
```

---

## Reusable Prompt Templates

### Starting a New Feature
```
I want to add [feature] to [project].
1. Use Perplexity to research best approaches
2. Use Context7 to get docs for any libraries needed
3. Implement it
4. Run /test-regression
5. Semgrep scan
6. Create GitHub PR and Linear issue
```

### Debugging Production
```
Use Sentry to check recent errors on [project].
Use Pieces to recall recent changes.
Investigate and fix the issue.
Run /test-all to verify fix.
Ship it.
```

### Starting Fresh Session
```
Use Pieces to recall what I was working on last session.
Show me the current Linear issues for [project].
Let's continue where I left off.
```

---

## Test Commands

Run from Claude Code:
- `/test-regression` — Full regression suite
- `/test-persistence` — Data persistence validation
- `/test-stress` — Multi-user simulation
- `/test-edge-cases` — Edge case testing
- `/test-performance` — Critical path monitoring
- `/test-all` — Complete test suite with report

---

## The One-Liner

> **Research → Plan → Build → Test → Ship → Monitor**
> 
> Every MCP has a role. Use them together, not in isolation.