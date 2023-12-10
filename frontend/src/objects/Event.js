/*
Storage mechanism for a vendor object
*/
class Event {
  /*
      id: int - database id assigned to this vendor
      name: string - name of the vendor
      email: string - email of the vendor
      website: string - (Optional) website of the vendor.
      phone_number: string - (Optional) phone number of the vendor.
      */
  constructor(id, title, location, date, time = Date.now(), info = '') {
    this.id = id;
    this.title = title;
    this.location = location;
    this.date = date;
    this.time = time;
    this.info = info;
  }

  // Create a vendor object from json representation
  // constructor(json){
  //     this.id = json.vendor_id;
  //     this.name = json.name;
  //     this.email = json.email;
  //     this.website = json.website;
  //     this.phone_number = json.phone_number;
  // }

  // Use this method to get a json object for the vendor
  get json() {
    return JSON.stringify(this);
  }
}

module.exports = Event;

