import Event from '../../objects/Event.js';

export default class MockEventService {
  static mockEvents = [];

  static init() {
    if (this.mockEvents === undefined || this.mockEvents.length === 0) {
      this.mockEvents = [
        new Event(1, 'Music Festival', 'Central Park, NY', new Date(2023, 5, 20, 16, 0), new Date(2023, 5, 20, 18, 0), 'A festival of music and arts.', 50),
        new Event(2, 'Tech Conference', 'Convention Center, SF', new Date(2023, 6, 15, 9, 0), new Date(2023, 6, 15, 11, 0), 'A conference for tech enthusiasts.', 100),
        new Event(3, 'Food Fair', 'Downtown, LA', new Date(2023, 7, 10, 11, 0), new Date(2023, 7, 10, 13, 0), 'A fair showcasing local food vendors.', 30),
        new Event(4, 'Book Expo', 'Library, Boston', new Date(2023, 8, 5, 10, 0), new Date(2023, 8, 5, 12, 0), 'An expo for book lovers.', 40),
        new Event(5, 'Film Festival', 'Cinema, Austin', new Date(2023, 9, 1, 13, 0), new Date(2023, 9, 1, 15, 0), 'A festival showcasing independent films.', 60),
        new Event(6, 'Art Exhibition', 'Museum, Chicago', new Date(2023, 10, 25, 14, 0), new Date(2023, 10, 25, 16, 0), 'An exhibition of contemporary art.', 20),
        new Event(7, 'Craft Market', 'Town Square, Portland', new Date(2023, 11, 20, 10, 0), new Date(2023, 11, 20, 12, 0), 'A market for local crafts.', 35),
        new Event(8, 'Comedy Night', 'Theater, Seattle', new Date(2023, 0, 15, 20, 0), new Date(2023, 0, 15, 22, 0), 'A night of stand-up comedy.', 15),
        new Event(9, 'Poetry Reading', 'Cafe, Denver', new Date(2023, 1, 10, 19, 0), new Date(2023, 1, 10, 21, 0), 'A reading by local poets.', 10),
        new Event(10, 'Dance Workshop', 'Studio, Miami', new Date(2023, 2, 7, 18, 0), new Date(2023, 2, 7, 20, 0), 'A workshop for dance enthusiasts.', 25),
      ];
    }
  }

  static getAllEvents() {
    return this.mockEvents;
  }

  static getEventById(id) {
    console.log('Get event by id was called with id: ', id);
    const e = this.mockEvents.filter((event) => event.eventId === id);
    return e.length > 0 ? e[0] : null;
  }

  static addEvent(event) {
    this.mockEvents.push(event);
  }

  static deleteEvent(id) {
    this.mockEvents = this.mockEvents.filter((event) => event.event_id !== id);
  }

  static updateEvent(event) {
    this.mockEvents = this.mockEvents.map((e) => e.event_id === event.event_id ? event : e);
  }
}
