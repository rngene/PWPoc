import { test, expect } from '@playwright/test';
test.describe('Countries page', () => {
    test('has title', async ({ page }) => {
        await page.goto('/');

        await expect(page).toHaveTitle("Countries");
    });

    test('has country label', async ({ page }) => {
        await page.goto('/');
    
        await expect(page.getByTestId('country-label')).toHaveText('Country');
    });
});
