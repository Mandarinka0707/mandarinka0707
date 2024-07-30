const { test } = require('@playwright/test');
const fs = require('fs');
const moment = require('moment');
const csv = require('csv-parser');
  test('holiday test', async ({ page }) => {
    test.setTimeout(120_000);
    await page.goto('https://testjaxel.bamboohr.com/login.php?r=%2Fhome%2F');
    await page.locator('(//*[@name="username"])[2]').fill('dutalieva@jaxel.com');
    await page.locator('//*[@name="password"]').fill('555527DAMXmx');
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.getByRole('button', { name: 'Yes, Trust this Browser' }).click();
    await page.locator('[href="/settings/"]').click();
    await page.getByText('Holidays').click();
    const holi = [];
    const holidayRows = await page.locator('table tr').all();
    for (const row of holidayRows) {
        const deleteButton = await row.getByLabel('Delete').first();
        await deleteButton.click();
      await page.getByRole('button', { name: 'Yes' }).click();
      await page.waitForSelector('table');
    };
  });
  