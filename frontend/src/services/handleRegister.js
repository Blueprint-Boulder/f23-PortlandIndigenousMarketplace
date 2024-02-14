import axios from 'axios';
import config from '../config';
// function that returns a boolean, true if the registration was successful, false otherwise.
export async function handleRegister(data) {
  const server = axios.create({
    baseURL: config.baseUrl,
    withCredentials: false,
  });
  let success;
  await server.post('/vendors', data).then(() => success = true).catch((e) => success = false && console.log('error:', e));
  return success;
}
