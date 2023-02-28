import { test, expect } from '@playwright/test';
import country from '../src/mocks/country.json'

test.describe('Countries selection', () => {
    test('populates properties correctly', async ({ page }) => {
   
        await page.route('https://countries.trevorblades.com/graphql', async route => {
            await route.fulfill({
                body: JSON.stringify(country)
            });            
        });

        await page.goto('/');
        await page.getByTestId('country-select').selectOption('T2');

        const requestPromise = page.waitForRequest('https://countries.trevorblades.com/graphql');   
        await page.getByTestId('submit-button').click();
        const request = await requestPromise; 

        expect(request.postData()).toContain('{"id":"T2"}');
        await expect(page.getByTestId('capital-label')).toHaveText('test capital');
        await expect(page.getByTestId('currency-label')).toHaveText('test currency');

        await page.getByTestId('submit-button').click();
    });
});
