import axios from 'axios';

export async function handleLoginVendor(data) {
  const server = axios.create({
    baseURL: 'http://localhost:3001',
  });
  let response;
  await server.post('/vendors/login', data).then((res) => response = res.data).catch((err) => console.log('error:', err));
  console.log('response:', response);
  return response;
}
