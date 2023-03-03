import { test, expect } from '@playwright/test';
import country from './mocks/country.json'

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
        expect(request.postData()).toContain('capital');
        expect(request.postData()).toContain('currency');
        expect(request.postData()).toContain('phone');

        await expect(page.getByTestId('capital-label')).toHaveText('test capital');
        await expect(page.getByTestId('currency-label')).toHaveText('test currency');
        await expect(page.getByTestId('phone-label')).toHaveText('123');
    });

    test('shows error when graph call fails', async ({ page }) => {
        await page.route('https://countries.trevorblades.com/graphql', async route => {
            await route.fulfill({
                status: 500,
                body: '{}'
            });            
        });

        await page.goto('/');
        
        await expect(page.getByTestId('error-label')).toBeHidden();  

        await page.getByTestId('submit-button').click();

        await expect(page.getByTestId('error-label')).toBeVisible();
    });   
    
    test('caches graph call', async ({ page }) => {

        let numberOfRequests=0;

        page.on('request', data => {
            if (data.url()=='https://countries.trevorblades.com/graphql') {
                numberOfRequests++;

            }

        });
        await page.route('https://countries.trevorblades.com/graphql', async route => {
            await route.fulfill({
                body: JSON.stringify(country)
            });            
        });

        await page.goto('/');

        await page.getByTestId('submit-button').click();
        await page.getByTestId('submit-button').click();

        expect(numberOfRequests).toBe(1);

    });    
});
