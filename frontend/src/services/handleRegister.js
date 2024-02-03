import axios from 'axios';
// function that returns a boolean, true if the registration was successful, false otherwise.
export async function handleRegister(data) {
  const server = axios.create({
    baseURL: 'http://localhost:3001',
    withCredentials: false,
  });
  let success;
  await server.post('/vendors', data).then(() => success = true).catch(() => success = false);
  return success;
}
