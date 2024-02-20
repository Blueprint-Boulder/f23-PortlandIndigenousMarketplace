/*
Storage mechanism for a vendor object
*/
class Event {
  constructor(eventId, name, location, startTime, endTime, description, vendorCapacity) {
    this.eventId = eventId;
    this.name = name;
    this.location = location;
    this.date = startTime.toLocaleDateString();
    this.startTime = startTime.toLocaleTimeString();
    this.endTime = endTime.toLocaleTimeString();
    this.description = description;
    this.vendorCapacity = vendorCapacity;
  }

  get json() {
    return JSON.stringify(this);
  }
}

module.exports = Event;
