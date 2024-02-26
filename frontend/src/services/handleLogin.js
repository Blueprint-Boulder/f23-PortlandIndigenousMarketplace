import axios from 'axios';
import config from '../config.js';
export async function handleLoginVendor(data) {
  const server = axios.create({
    baseURL: config.baseUrl,
  });
  const res = await server.post('/vendors/login', data);
  return res;
}
