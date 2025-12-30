Read .claude/test-config.json for project settings.
Use Playwright MCP to run regression tests:
1. Navigate to {{baseUrl}} - verify loads under {{performance.loadThreshold}}ms
2. Create 3 items using {{actions.createItem}}
3. Move each through {{actions.moveItem.columns}} workflow
4. Verify counts on {{routes.dashboard}}
5. Delete all items and verify empty state
6. Report failures with screenshots
