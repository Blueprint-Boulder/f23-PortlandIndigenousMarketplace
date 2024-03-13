export default class Violation {
  constructor(id, type, description, vendorId) {
    this.id = id;
    this.type = type;
    this.description = description;
    this.vendorId = vendorId;
  }

  get json() {
    return JSON.stringify(this);
  }
}
