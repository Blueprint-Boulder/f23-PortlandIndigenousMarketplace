/*
Storage mechanism for a vendor object
*/
export default class Event {
  constructor(eventId, name, location, starttime, endtime, description, vendorCapacity) {
    this.eventId = eventId;
    this.name = name;
    this.location = location;
    this.date = starttime.toLocaleDateString();
    this.starttime = starttime.toLocaleTimeString();
    this.endtime = endtime.toLocaleTimeString();
    this.startDate = starttime.toLocaleDateString();
    this.endDate = endtime.toLocaleDateString();
    this.description = description;
    this.vendorCapacity = vendorCapacity;
  }

  get json() {
    return JSON.stringify(this);
  }
}
