import { sleep } from 'k6';
import { browser, devices } from 'k6/browser';

export const options = {
  scenarios: {
    browser: {
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
  const iphoneX = devices['iPhone X'];
  const context = await browser.newContext(iphoneX);
  const page = await context.newPage();

  try {
    await page.goto(
      'https://e-commerce-neon-nine.vercel.app/product/R9fEh4tFwCOwQuUYbxMy'
    );
    sleep(1);
    await page.screenshot({ path: 'screenshots/devices/iphonex.png' });
  } finally {
    page.close();
  }
}
