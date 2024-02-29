

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
}
