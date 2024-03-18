import axios from 'axios';
import Cookies from 'js-cookie';
import User from '../objects/User.js';

class HttpClient {
  constructor(baseURL) {
    this.axiosInstance = axios.create({
      baseURL: baseURL,
      withCredentials: true,
    });
    this.user = null;
  }

  // for testing only
  manuallySetCookie(cookie, isadmin) {
    this.axiosInstance.defaults.headers.common['Cookie'] = cookie;
    this.user = User.newUserFromCookie(cookie, isadmin);
  }

  destroyUser() {
    Cookies.remove('auth');
    Cookies.remove('auth_pim');
    this.user = null;
  }
}

export default HttpClient;
