import Event from '../../objects/Event';

export default class MockEventService {
  static mockEvents = [];

  static init() {
    if (this.mockEvents === undefined || this.mockEvents.length === 0) {
      this.mockEvents = [
        new Event(1, 'Music Festival', 'Central Park, NY', new Date(2023, 5, 20, 16, 0), 'A festival of music and arts.', 50, 4),
        new Event(2, 'Tech Conference', 'Convention Center, SF', new Date(2023, 6, 15, 9, 0), 'A conference for tech enthusiasts.', 100, 8),
        new Event(3, 'Food Fair', 'Downtown, LA', new Date(2023, 7, 10, 11, 0), 'A fair showcasing local food vendors.', 30, 3),
        new Event(4, 'Book Expo', 'Library, Boston', new Date(2023, 8, 5, 10, 0), 'An expo for book lovers.', 40, 5),
        new Event(5, 'Film Festival', 'Cinema, Austin', new Date(2023, 9, 1, 13, 0), 'A festival showcasing independent films.', 60, 6),
        new Event(6, 'Art Exhibition', 'Museum, Chicago', new Date(2023, 10, 25, 14, 0), 'An exhibition of contemporary art.', 20, 2),
        new Event(7, 'Craft Market', 'Town Square, Portland', new Date(2023, 11, 20, 10, 0), 'A market for local crafts.', 35, 4),
        new Event(8, 'Comedy Night', 'Theater, Seattle', new Date(2023, 0, 15, 20, 0), 'A night of stand-up comedy.', 15, 3),
        new Event(9, 'Poetry Reading', 'Cafe, Denver', new Date(2023, 1, 10, 19, 0), 'A reading by local poets.', 10, 2),
        new Event(10, 'Dance Workshop', 'Studio, Miami', new Date(2023, 2, 7, 18, 0), 'A workshop for dance enthusiasts.', 25, 3),
      ];
    }
  }

  static getEvents() {
    return this.mockEvents;
  }

  static getEvent(id) {
    return this.mockEvents.find((event) => event.event_id === id);
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
