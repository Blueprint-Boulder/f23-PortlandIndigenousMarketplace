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
        data.event_id,
        data.name,
        data.location,
        new Date(data.starttime),
        new Date(data.endtime),
        data.description,
        data.vendorCapacity,
    ));
  }

  async getEventById(eventId) {
    const eventData = await this.eventsRepository.getEventById(eventId);
    return new Event(
        eventData.event_id,
        eventData.name,
        eventData.location,
        new Date(eventData.starttime),
        new Date(eventData.endtime),
        eventData.description,
        eventData.vendorCapacity,
    );
  }

  async createEvent(event) {
    const eventData = {
      // Assuming your Event class has properties that directly map to your data structure
      name: event.name,
      location: event.location,
      starttime: event.starttime.toISOString(), // Convert Date object to string
      endtime: event.endtime.toISOString(),
      description: event.description,
      vendorCapacity: event.vendorCapacity,
      // Include other properties as needed
    };
    return await this.eventsRepository.createEvent(eventData);
  }

  async updateEvent(eventId, event) {
    const eventData = {
      name: event.name,
      location: event.location,
      starttime: event.starttime.toISOString(),
      endtime: event.endtime.toISOString(),
      description: event.description,
      vendorCapacity: event.vendorCapacity,
    };
    return await this.eventsRepository.updateEvent(eventId, eventData);
  }

  async deleteEvent(eventId) {
    return await this.eventsRepository.deleteEvent(eventId);
  }
}
