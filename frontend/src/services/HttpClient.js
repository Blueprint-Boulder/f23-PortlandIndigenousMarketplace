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

  processCookie() {
    if (Cookies.get('auth_pim') != undefined) {
      const cookie = Cookies.get('auth_pim');
      this.user = User.newUserFromCookie(cookie, true);
    } else if ( Cookies.get('auth') != undefined ) {
      const cookie = Cookies.get('auth');
      this.user = User.newUserFromCookie(cookie, false);
    }
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
