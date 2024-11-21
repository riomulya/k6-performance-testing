import http from 'k6/http';
import { check } from 'k6';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { SharedArray } from 'k6/data';

const userCredentials = new SharedArray('users with credentials', function () {
  return JSON.parse(open('./users.json')).users;
});

export const options = {
  stages: [
    { duration: '1s', target: 10 }, // 10 users
    { duration: '3s', target: 50 }, // ramp up to 50 users
    { duration: '1s', target: 0 }, // ramp down
  ],
};

export default function () {
  const randomCredential = randomItem(userCredentials);

  let res = http.post(
    'https://test-api.k6.io/auth/token/login/',
    JSON.stringify({
      username: randomCredential.username,
      password: randomCredential.password,
    }),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  check(res, {
    'status is 200': (r) => r.status === 200,
  });
}
