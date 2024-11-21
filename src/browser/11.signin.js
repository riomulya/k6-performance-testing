import { browser } from 'k6/browser';

export const options = {
  scenarios: {
    ui: {
      executor: 'shared-iterations',
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
  thresholds: {
    checks: ['rate==1.0'],
  },
};

export default async function () {
  const page = await browser.newPage();

  try {
    // **Sign-In**
    await page.goto('https://e-commerce-neon-nine.vercel.app/signin');
    // sleep(1);

    // Isi formulir sign-in
    await page.locator('input[name="email"]').type('test@gmail.com');
    await page.locator('input[name="password"]').type('Test1234');

    await page.click('button[type="submit"]');

    await Promise.all([page.waitForNavigation()]);

    await page.screenshot({ path: 'screenshots/signin_success.png' });
  } finally {
    await page.close();
  }
}
