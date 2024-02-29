import EventsRepository from './EventsRepository.js';
import Event from '../../objects/Event.js';

export default class EventsService {
  constructor(httpClient) {
    this.httpClient = httpClient;
    this.eventsRepository = new EventsRepository(httpClient);
  }

  async getAllEvents() {
    const eventsData = await this.eventsRepository.getAllEvents();
    return eventsData.map((data) => new Event(
        data.eventId,
        data.name,
        data.location,
        new Date(data.start_time),
        new Date(data.end_time),
        data.description,
        data.vendor_capacity,
    ));
  }

  async getEventById(eventId) {
    const eventData = await this.eventsRepository.getEventById(eventId);
    return new Event(
        eventData.eventId,
        eventData.name,
        eventData.location,
        new Date(eventData.start_time),
        new Date(eventData.end_time),
        eventData.description,
        eventData.vendorCapacity,
    );
  }

  async createEvent(event) {
    const eventData = {
      // Assuming your Event class has properties that directly map to your data structure
      name: event.name,
      location: event.location,
      start_time: event.start_time.toISOString(), // Convert Date object to string
      end_time: event.end_time.toISOString(),
      description: event.description,
      vendorCapacity: event.vendorCapacity,
      // Include other properties as needed
    };
    return await this.eventsRepository.createEvent(eventData);
  }

  async updateEvent(event) {
    const eventData = {
      name: event.name,
      location: event.location,
      start_time: event.start_time.toISOString(),
      end_time: event.end_time.toISOString(),
      description: event.description,
      vendorCapacity: event.vendorCapacity,
    };
    return await this.eventsRepository.updateEvent(event.eventId, eventData);
  }

  async deleteEvent(eventId) {
    return await this.eventsRepository.deleteEvent(eventId);
  }
}
