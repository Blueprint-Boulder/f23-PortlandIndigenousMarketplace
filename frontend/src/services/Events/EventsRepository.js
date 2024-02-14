import axios from 'axios';

export default class EventsRepository {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getAllEvents() {
    try {
      const response = await axios.get(`${this.baseUrl}/events`);
      return response.data;
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  }

  async getEventById(eventId) {
    try {
      const response = await axios.get(`${this.baseUrl}/events/${eventId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching event with ID ${eventId}:`, error);
      throw error;
    }
  }

  async createEvent(eventData) {
    try {
      const response = await axios.post(`${this.baseUrl}/events`, eventData);
      return response.data;
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  }

  async updateEvent(eventId, eventData) {
    try {
      const response = await axios.put(`${this.baseUrl}/events/${eventId}`, eventData);
      return response.data;
    } catch (error) {
      console.error(`Error updating event with ID ${eventId}:`, error);
      throw error;
    }
  }

  async deleteEvent(eventId) {
    try {
      const response = await axios.delete(`${this.baseUrl}/events/${eventId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting event with ID ${eventId}:`, error);
      throw error;
    }
  }
}
