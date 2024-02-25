import axios from 'axios';

class HttpClient {
  constructor(baseURL) {
    this.axiosInstance = axios.create({
      baseURL: baseURL,
      withCredentials: true,
    });
    this.cookie = '';
  }

  setCookie(cookie) {
    this.cookie = cookie;
    this.axiosInstance.defaults.headers.common['Cookie'] = cookie;
  }
}

export default HttpClient;
