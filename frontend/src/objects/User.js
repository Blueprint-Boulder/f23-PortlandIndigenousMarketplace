import {jwtDecode} from 'jwt-decode';
import Cookies from 'js-cookie';
/*
Storage mechanism for the currently logged-in user.
*/
export default class User {
  constructor(id, name, email, isadmin, phoneNumber=null, website=null) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.isadmin = isadmin;
    this.phoneNumber = phoneNumber;
    this.website = website;
  }

  static newUserFromCookie(cookie) {
    const decode = jwtDecode(cookie);
    // console.log(decode.website);
    if ('admin_id' in decode) return new User(decode.admin_id, decode.name, decode.email, true, null, null);
    return new User(decode.vendor_id, decode.name, decode.email, false, decode.phone_number, decode.website);
  }

  static getLoggedInUser() {
    const cookie = Cookies.get('auth') || Cookies.get('auth_pim');
    if (cookie !== undefined) {
      return this.newUserFromCookie(cookie);
    }
    return undefined;
  }
}
