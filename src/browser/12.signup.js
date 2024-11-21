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
    },
  },
  thresholds: {
    checks: ['rate==1.0'],
  },
};

export default async function () {
  const page = await browser.newPage();

  try {
    // **Sign-Up** Test
    // Arahkan ke halaman sign-up
    await page.goto('https://e-commerce-neon-nine.vercel.app/signup');
    sleep(1);

    // Isi formulir sign-up
    await page.locator('input[name="fullname"]').type('newuser');
    await page.locator('input[name="email"]').type('newuser@example.com');
    await page.locator('input[name="password"]').type('Test1234');

    // Klik tombol submit
    await page.click('button[type="submit"]');
    sleep(2);

    // Ambil screenshot setelah sign-up
    await page.screenshot({ path: 'screenshots/signup_success1.png' });
  } finally {
    await page.close();
  }
}
