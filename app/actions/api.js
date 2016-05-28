import axios from 'axios';

let API_KEY = '';
let HOSTNAME = '';

function request(method, url, body, baseURL = HOSTNAME) {
  console.log('baseUr', HOSTNAME);
  console.log('apikey', API_KEY);
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Api-Key': API_KEY,
  };

  const config = {
    headers,
    method,
    data: JSON.stringify(body),
    url: `${baseURL}/api${url}`,
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

export function setApiKey(key) {
  API_KEY = key;
}

export function setHostname(host) {
  HOSTNAME = host;
}
