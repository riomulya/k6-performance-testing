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

  http.post(
    'https://test-api.k6.io/user/register/',
    JSON.stringify(credentials),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  let res = http.post(
    'https://test-api.k6.io/auth/token/login/',
    JSON.stringify({
      username: credentials.username,
      password: credentials.password,
    }),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const accessToken = res.json().access;
  console.log(accessToken);

  http.get('https://test-api.k6.io/my/crocodiles/', {
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
  });

  res = http.post(
    'https://test-api.k6.io/my/crocodiles/',
    JSON.stringify({
      name: 'Random croc',
      sex: 'M',
      date_of_birth: '1900-10-28',
    }),
    {
      headers: {
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': 'application/json',
      },
    }
  );

  const newCrocodileId = res.json().id;

  res = http.get(`https://test-api.k6.io/my/crocodiles/${newCrocodileId}/`, {
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
  });

  check(res, {
    'status is 200': (r) => r.status === 200,
    'crocodile id': (r) => r.json().id === newCrocodileId,
  });
}