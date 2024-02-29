import {jwtDecode} from 'jwt-decode';
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

  static newUserFromCookie(cookie, isadmin) {
    const decode = jwtDecode(cookie);
    if (isadmin) return new User(decode.admin_id, decode.name, decode.email, isadmin, null, null);
    return new User(decode.vendor_id, decode.name, decode.email, isadmin, decode.phone_number, decode.website);
  }
}
