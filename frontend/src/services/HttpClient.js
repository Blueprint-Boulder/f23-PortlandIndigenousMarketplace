import axios from 'axios';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
import User from '../objects/User.js';

class HttpClient {
  constructor(baseURL) {
    this.axiosInstance = axios.create({
      baseURL: baseURL,
    });
    this.user = null;
  }

  processCookie() {
    // need to do this for testing?
    // this.axiosInstance.defaults.headers.common['Cookie'] = cookie;

    if (Cookies.get('auth_pim') != undefined) {
      const cookie = Cookies.get('auth_pim');
      const decode = jwtDecode(cookie);

      this.user = new User(decode.admin_id, decode.name, decode.email, true, null, null);
    } else if ( Cookies.get('auth') != undefined ) {
      const cookie = Cookies.get('auth');
      const decode = jwtDecode(cookie);

      this.user = new User(decode.vendor_id, decode.name, decode.email, false, decode.phone_number, decode.website);
    }
  }
}

export default HttpClient;
