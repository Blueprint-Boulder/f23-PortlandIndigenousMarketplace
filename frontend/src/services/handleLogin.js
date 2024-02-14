import axios from 'axios';
import config from '../config';
export async function handleLoginVendor(data) {
  const server = axios.create({
    baseURL: config.baseUrl,
  });
  let response;
  await server.post('/vendors/login', data).then((res) => response = res).catch((err) => console.log('error:', err));
  console.log('response:', response);
  return response;
}
