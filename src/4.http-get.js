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
  let res = http.get('https://test-api.k6.io/public/crocodiles/');
  const crocodiles = res.json();
  const crocodileId = crocodiles[0].id;
  const crocodileName = crocodiles[0].name;

  res = http.get(`https://test-api.k6.io/public/crocodiles/${crocodileId}/`);

  console.log(res.headers.Allow);
  console.log(res.headers['Content-Type']);

  check(res, {
    'status is 200': (r) => r.status === 200,
    'crocodile name': (r) => r.json().name === crocodileName,
  });
}
