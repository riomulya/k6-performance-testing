import http from 'k6/http';
import { check } from 'k6';

export const options = {
  stages: [
    { duration: '1s', target: 10 }, // 10 users
    { duration: '3s', target: 50 }, // ramp up to 50 users
    { duration: '1s', target: 0 }, // ramp down
  ],
};

export default function () {
  const credentials = {
    username: 'test_' + Date.now(),
    password: 'secret_' + Date.now(),
  };

  console.log(credentials);

  const res = http.post(
    'https://test-api.k6.io/user/register/',
    JSON.stringify(credentials),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}
