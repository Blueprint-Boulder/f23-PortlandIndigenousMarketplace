import axios from "axios";
export default function handleRegister(data){
    const server = axios.create({
        baseURL: 'http://localhost:3001',
        withCredentials: false,
      });
      let response;
    server.post('/vendors', data).then((res) => console.log("response from register", response = res.data).catch((err) => response = err));
    return response;
}