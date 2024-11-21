import { check, sleep } from 'k6';
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
      // executor-specific configuration
      vus: 10,
      iterations: 20,
      maxDuration: '10s',
    },
  },
  thresholds: {
    checks: ['rate==1.0'],
  },
};

export default async function () {
  const page = await browser.newPage();

  try {
    await page.goto(
      'https://e-commerce-neon-nine.vercel.app/product/R9fEh4tFwCOwQuUYbxMy'
    );

    sleep(1);

    await page.screenshot({ path: 'screenshots/shirt.png' });
  } finally {
    await page.close();
  }
}
