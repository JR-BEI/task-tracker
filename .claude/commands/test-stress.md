Read .claude/test-config.json for project settings.
Use Playwright MCP to stress test:
1. Create 5 items rapidly at {{baseUrl}}
2. Move all through {{actions.moveItem.columns}} quickly
3. Verify no data loss or duplication
4. Check {{routes.dashboard}} counts match
5. Report timing
