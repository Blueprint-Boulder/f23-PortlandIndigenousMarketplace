/*
Storage mechanism for a vendor object
*/
class Event {
  constructor(eventId, name, location, datetime, description, vendorCapacity, durationHours = 2) {
    this.eventId = eventId;
    this.name = name;
    this.location = location;
    this.date = datetime.toLocaleDateString();
    this.startTime = datetime.toLocaleTimeString();

    // Create a new Date object for the end time
    const endTime = new Date(datetime.getTime() + durationHours * 60 * 60 * 1000);
    this.endTime = endTime.toLocaleTimeString();

    this.description = description;
    this.vendorCapacity = vendorCapacity;
  }

  get json() {
    return JSON.stringify(this);
  }
}

module.exports = Event;