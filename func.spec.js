const { test, expect } = require('@playwright/test');
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
    const years = [ 2023, 2022, 2021]; // Adjust years as needed
    for (const year of years) {
      await page.waitForSelector('table tbody tr', { state: 'visible' });
      let holidayRows = await page.$$('table tbody tr');
      for (let i = 0; i < holidayRows.length; i++) {
          console.log(holidayRows.length);
          const row = holidayRows[i];
          const holidayNameCell = await row.locator('td:first-child a').first();
          const holidayLink = await holidayNameCell.getAttribute('href');
          await holidayNameCell.click();  
          const nameInput = await page.locator('#mui-1');
          const dateInput = await page.getByPlaceholder('mm/dd/yyyy');
          const name = await nameInput.getAttribute('value');
          const date = await dateInput.getAttribute('value');
          let location;
          if ((await page.$('//*[@id="filter-description"]/div/span')) !== null) {
                location = await page.locator('//*[@id="filter-description"]/div/span').textContent();
          } else {
                location = "All";
          }
    
          holi.push({ name, date, location });
          await page.getByRole('button', { name: 'Save' }).first().click();
          await page.waitForSelector('tbody tr', { state: 'visible' });
      }
            await page.locator(`[href="?year=${year}"]`).click();
            await page.waitForSelector('tbody tr', { state: 'visible' });
            console.log(holi);
            console.log("YEEEES");
    }
  });

  //     await page.waitForSelector('tbody tr', { state: 'visible' });
  //     const holidayRows = await page.locator('tbody tr').all();
  //       for (let i = 0; i < holidayRows.length; i++) {
  //         console.log(holidayRows.length);
  //         const row = holidayRows[i];
  //         const holidayNameCell = await row.locator('td:first-child a').first();
  //         const holidayLink = await holidayNameCell.getAttribute('href');
  //         await holidayNameCell.click();

  //         const nameInput = await page.locator('#mui-1');
  //         const dateInput = await page.getByPlaceholder('mm/dd/yyyy');
  //         const name = await nameInput.getAttribute('value');
  //         const date = await dateInput.getAttribute('value');
  //         let location;

  //         if ((await page.$('//*[@id="filter-description"]/div/span')) !== null) {
  //           location = await page.locator('//*[@id="filter-description"]/div/span').textContent();
  //         } else {
  //           location = "All";
  //         }

  //         holi.push({ name, date, location });
  //         await page.getByRole('button', { name: 'Save' }).first().click();
  //          await page.waitForSelector('tbody tr', { state: 'visible' });
  //       }
  //       // await page.locator(`[href="?year=${year}"]`).click();
  //       // await page.waitForSelector('tbody tr', { state: 'visible' });

  //       console.log(holi);
  //       console.log("YEEEES");
  //     }
  // });
 // const years = await page.locator('.fab-Button fab-Button--secondary fab-Button--outline if (years !== 2024) {
    //   //   await page.locator(`[href="?year=${year}"]`).click(); 
    //   await page.waitForSelector('tbody tr ', { state: 'visible' });
    //   // }
    //   for( const  element of await page.locator('tbody td a').all()){
    //       await element.click();
    //       const nameInput = await page.locator('#mui-1');
    //       const dateInput = await page.getByPlaceholder('mm/dd/yyyy');
    //       const name = await nameInput.getAttribute('value');
    //       const date = await dateInput.getAttribute('value');
    //       let location;

    //       if ((await page.$('//*[@id="filter-description"]/div/span')) !== null) {
    //         location = await page.locator('//*[@id="filter-description"]/div/span').textContent();
    //       } else {
    //         location = "All";
    //       }

    //       holi.push({ name, date, location });
    //       await page.getByRole('button', { name: 'Save' }).first().click();
      
    //   }
    //   // await page.locator(`[href="?year=${year}"]`).click();
    //   // await page.waitForSelector('tbody tr', { state: 'visible' });
    //   console.log(holi);
    //   console.log("YEEEES");
    // }
  // const pageContent = await page.locator('.jss-x86').getByText('Just These Employees'); 
      // const loc = await page.locator('.jss-x86').getByText('All Employees');
      // const locationSpan = await page.locator('.RemoveEmployeeFilter__text');
      // const name = await nameInput.getAttribute('value');
      // const date = await dateInput.getAttribute('value');
      // let location;
      // if (loc.isVisible()) {
      //   location = "All"; 
      // } else if (pageContent.isVisible()){
      //   location =  await page.locator('.RemoveEmployeeFilter__text').textContent();
      // } 
      // else{
      //   location = 'Unrnown';
      // }


    //   let location;
    //   if (await page.locator('//*[@id="js-holidays"]/div/fieldset/div[3]/div/div/div[1]/span[2]/span').textContent() === "Just These Employees") 
    //  {
    //     location =  await page.locator('.RemoveEmployeeFilter__text').textContent();
    //   } else if (await page.locator('//*[@id="js-holidays"]/div/fieldset/div[3]/div/div/div[1]/span[2]/span').textContent() === "All Employees") {
    //     location = "All"; 
    //   } 
    //   else{
    //     location = "Unk";
    //   }
    //   holi.push({ name, date, location });
    //    await page.getByRole('button', { name: 'Save' }).first().click();
    //    await page.goBack(); 
    //    await page.waitForSelector('table tbody tr', { state: 'visible' }); 
    // }