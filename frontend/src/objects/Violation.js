export default class Violation {
  constructor(id, type, description, vendor_id) {
    this.id = id;
    this.type = type;
    this.description = description;
    this.vendor_id = vendor_id;
  }

  get json() {
    return JSON.stringify(this);
  }
}
