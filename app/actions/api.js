import axios from 'axios';

console.log('API KEY', process.env.SONARR_API_KEY);

function request(method, url, body, baseURL = 'http://10.0.1.10:8989/api') { // TODO
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Api-Key': process.env.SONARR_API_KEY, // TODO
  };

  const config = {
    headers,
    method,
    data: JSON.stringify(body),
    url: `${baseURL}${url}`,
  };

  return axios(config)
    .then(res => res.data)
    .catch(error => Promise.reject({error: error.data.error, statusCode: error.status}));
}

export function get(url) {
  return request('get', url);
}

export function post(url, data) {
  return request('post', url, data);
}

export function put(url, data) {
  return request('put', url, data);
}

export function remove(url, data) {
  return request('delete', url, data);
}
