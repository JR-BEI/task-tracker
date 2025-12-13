# Design Review Unpublished Commits

Review design compliance for all uncommitted changes.

## Instructions

1. Get list of changed files:
```bash
git diff --name-only
```

2. Filter for frontend files (tsx, css, html)

3. For each changed frontend file:
   - Identify the route/page it affects
   - Navigate to that page using `mcp_playwright_browser_navigate`
   - Take screenshot at 1440px viewport
   - Compare against `/context/design-principles.md`
   - Check console for errors

4. Generate design review report using `@agent-design-review` format

## Output

Provide structured report with:
- Files reviewed
- Pages checked
- Compliance status per design principle category
- Screenshots captured
- Issues found
- Recommendation (merge/fix)