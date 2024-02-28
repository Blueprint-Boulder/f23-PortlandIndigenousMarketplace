// import Permission from './Permission.js';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';

/*
Storage mechanism for the currently logged-in user.
*/
export default class User {
  constructor(id, name, email, isadmin, phone_number=null, website=null) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.isadmin = isadmin;
    this.phone_number = phone_number;
    this.website = website;
  }

  // isAdmin() {
  //   return this.permission === Permission.Admin;
  // }

  // isVendor() {
  //   return this.permission === Permission.Vendor;
  // }

  static createFromCookie() {
    if (Cookies.get('auth_pim') != undefined) {
      const cookie = Cookies.get('auth_pim');
      const decode = jwtDecode(cookie);

      return User(decode.admin_id, decode.name, decode.email, true, null, null);
    } else if ( Cookies.get('auth') != undefined ) {
      const cookie = Cookies.get('auth');
      const decode = jwtDecode(cookie);

      return User(decode.vendor_id, decode.name, decode.email, false, decode.phone_number, decode.website);
    } else {
      return undefined;
    }
  }
}
