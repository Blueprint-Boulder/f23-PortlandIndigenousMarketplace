export default class EventRequest {
  constructor(requestId, vendorId, eventId, approved, requestedAt, approvedAt) {
    this.requestId = requestId;
    this.vendorId = vendorId;
    this.eventId = eventId;
    this.approved = approved;
    this.requestedAt = requestedAt;
    this.approvedAt = approvedAt;
  }

  get json() {
    return JSON.stringify(this);
  }
}
