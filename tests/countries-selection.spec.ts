import { test, expect } from '@playwright/test';
test.describe('Countries selection', () => {
    test('populates properties correctly', async ({ page }) => {

        await page.route('https://countries.trevorblades.com/graphql', async route => {
            if (route!.request()!.postData()!.includes('{"id":"UA"}')) {
                const json = {"data":{"country":{"name":"test country","capital":"test capital","currency":"test currency","__typename":"Country"}}};
                await route.fulfill({ json });
            } else {
                route.abort();
            }
        });

        await page.goto('/');
        await page.getByTestId('country-select').selectOption('UA');
        await page.getByTestId('submit-button').click();

        await expect(page.getByTestId('capital-label')).toHaveText('test capital');
        await expect(page.getByTestId('currency-label')).toHaveText('test currency');
    });
});
