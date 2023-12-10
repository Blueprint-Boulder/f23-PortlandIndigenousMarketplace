import Event from '../../objects/Event.js';

/*
Provides an interface to retrieve vendor data from the backend.
*/
export default class MockEventService {
  // This is static so that every instance of MockVendorService
  // has the same vendors
  static mockevents = [];

  // Creates many mock vendors. Generated with chatgpt!
  static init() {
    if (this.mockevents === undefined) this.mockevents = [];

    if (this.mockevents.length === 0) {
      this.mockevents.push(new Event(
          1, 'Boulder Event', 'Boulder, Colorado',
          '12/3/23', '6:00', 'Lorem Ipsum'));
      this.mockevents.push(new Event(
          2, 'Denver Event', 'Denver, Colorado',
          '12/5/23', '7:00', 'Lorem Ipsum2'));
      this.mockevents.push(new Event(
          3, 'Aurora Event', 'Aurora, Colorado',
          '12/4/23', '8:00', 'Lorem Ipsum3'));
    }
  }

  // Fetches all vendors from the backend
  static getEvent() {
    return this.mockevents;
  }

  // Fetches the vendor with the given id from the backend
  static getEventById(id) {
    const v = this.mockevents.filter((event) => event.id === id);
    return v.length > 0 ? v[0] : null;
  }
}
