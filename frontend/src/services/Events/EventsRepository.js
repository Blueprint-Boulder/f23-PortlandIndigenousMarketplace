export default class EventsRepository {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  async getAllEvents() {
    try {
      const response = await this.httpClient.axiosInstance.get('/events');
      return response.data;
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  }

  async getEventById(eventId) {
    try {
      const response = await this.httpClient.axiosInstance.get(`/events/${eventId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching event with ID ${eventId}:`, error);
      throw error;
    }
  }

  async createEvent(eventData) {
    try {
      const response = await this.httpClient.axiosInstance.post('/events', eventData);
      return response.data;
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  }

  async updateEvent(eventId, eventData) {
    try {
      const response = await this.httpClient.axiosInstance.put(`/events/${eventId}`, eventData);
      return response.data;
    } catch (error) {
      console.error(`Error updating event with ID ${eventId}:`, error);
      throw error;
    }
  }

  async deleteEvent(eventId) {
    try {
      const response = await this.httpClient.axiosInstance.delete(`/events/${eventId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting event with ID ${eventId}:`, error);
      throw error;
    }
  }
}
