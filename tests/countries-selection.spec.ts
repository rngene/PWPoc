import { test, expect } from '@playwright/test';

import testCountry from '../src/mocks/testCountry.json'

test.describe('Countries selection', () => {
    test('populates properties correctly', async ({ page }) => {
    
        await page.route('https://countries.trevorblades.com/graphql', async route => {
            await route.fulfill({
                body: JSON.stringify(testCountry)
            });            
        });

        await page.goto('/');
        await page.getByTestId('country-select').selectOption('UA');

        const requestPromise = page.waitForRequest('https://countries.trevorblades.com/graphql');   
        await page.getByTestId('submit-button').click();
        const request = await requestPromise; 

        expect(request.postData()).toContain('{"id":"UA"}');
        await expect(page.getByTestId('capital-label')).toHaveText('test capital');
        await expect(page.getByTestId('currency-label')).toHaveText('test currency');

        await page.getByTestId('submit-button').click();
    });
});
