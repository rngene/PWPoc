import { test, expect } from '@playwright/test';

import testCountry from '../src/mocks/testCountry.json'

test.describe('Countries selection', () => {
    test('populates properties correctly', async ({ page }) => {
        await page.route('https://countries.trevorblades.com/graphql', async route => {
            if (route!.request()!.postData()!.includes('{"id":"UA"}')) {
                await route.fulfill({
                    body: JSON.stringify(testCountry)
                });
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
