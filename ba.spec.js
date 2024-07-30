const { test } = require('@playwright/test');
const fs = require('fs');
const moment = require('moment');
const csv = require('csv-parser');
  test('holiday test', async ({ page }) => {
    test.setTimeout(120_000);
    let holidays = []; // Переменная для хранения данных о праздниках

  const readStream = fs.createReadStream('Holidays.csv');
  const parser = csv();

  readStream.pipe(parser);

  for await (const row of parser) {
    const formattedDate = moment(row.date, 'ddd MMM DD YYYY').format('DD/MM/YYYY');
    if (row.location) {
      holidays.push({
        name: row.name,
        date: formattedDate,
        location: row.location
      });
    } else {
      holidays.push({
        name: row.name,
        date: formattedDate,
        location: 'Неизвестно'
      });
    }
  }
    await page.goto('https://testjaxel.bamboohr.com/login.php?r=%2Fhome%2F');
    await page.locator('(//*[@name="username"])[2]').fill('dutalieva@jaxel.com');
    await page.locator('//*[@name="password"]').fill('555527DAMXmx');
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.getByRole('button', { name: 'Yes, Trust this Browser' }).click();
    await page.locator('[href="/settings/"]').click();
    await page.getByText('Holidays').click();

    // Добавление праздников на сайт
    for (const holiday of holidays) {
      await page.locator('[href="add?year=2024"]').click();
      await page.locator("#mui-1").fill(holiday.name);
      await page.getByPlaceholder('mm/dd/yyyy').fill(holiday.date);
      await page.getByText('Edit').click();
      await page.getByRole('button', { name: 'All Employees' }).click();
      await page.locator("#menu-item-7").click();
      await page.getByText('Location').click();
      await page.getByText(holiday.location).click();
      await page.getByLabel('Filter Options').getByRole('button', { name: 'Save' }).click();
      await page.getByRole('button', { name: 'Save' }).click();

      await page.waitForTimeout(1000);
    }
  });

