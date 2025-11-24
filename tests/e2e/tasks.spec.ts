import { test, expect } from '@playwright/test';

test.describe('TaskForm', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
  });

  test('renders form with correct test IDs', async ({ page }) => {
    // Verify form element exists
    const form = page.getByTestId('task-form');
    await expect(form).toBeVisible();

    // Verify title input exists
    const titleInput = page.getByTestId('task-title-input');
    await expect(titleInput).toBeVisible();
    await expect(titleInput).toHaveAttribute('placeholder', 'Enter task title...');

    // Verify submit button exists
    const submitButton = page.getByTestId('task-submit-btn');
    await expect(submitButton).toBeVisible();
    await expect(submitButton).toHaveText('Add Task');
  });

  test('user can type a title and submit', async ({ page }) => {
    const titleInput = page.getByTestId('task-title-input');
    const submitButton = page.getByTestId('task-submit-btn');

    // Type a task title
    await titleInput.fill('My first task');
    await expect(titleInput).toHaveValue('My first task');

    // Set up console log listener
    const consoleLogs: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'log') {
        consoleLogs.push(msg.text());
      }
    });

    // Submit the form
    await submitButton.click();

    // Wait a bit for console log
    await page.waitForTimeout(100);

    // Verify the task was submitted (check console log)
    expect(consoleLogs.some(log => log.includes('My first task'))).toBeTruthy();
  });

  test('form clears after submission', async ({ page }) => {
    const titleInput = page.getByTestId('task-title-input');
    const submitButton = page.getByTestId('task-submit-btn');

    // Type a task title
    await titleInput.fill('Task to be cleared');
    await expect(titleInput).toHaveValue('Task to be cleared');

    // Submit the form
    await submitButton.click();

    // Verify the input is cleared
    await expect(titleInput).toHaveValue('');
  });

  test('requires title input before submission', async ({ page }) => {
    const titleInput = page.getByTestId('task-title-input');
    const submitButton = page.getByTestId('task-submit-btn');

    // Verify input has required attribute
    await expect(titleInput).toHaveAttribute('required');

    // Try to submit without filling the form
    await submitButton.click();

    // Form should prevent submission and input should still be empty
    await expect(titleInput).toHaveValue('');
  });
});
