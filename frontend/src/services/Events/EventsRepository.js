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

  // Get attending vendors for a specific event
  async getAttendingVendors(eventId) {
    try {
      const response = await this.httpClient.axiosInstance.get(`/events/${eventId}/vendors`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching attending vendors for event with ID ${eventId}:`, error);
      throw error;
    }
  }

  // Get requests for a specific event
  async getEventRequests(eventId) {
    try {
      const response = await this.httpClient.axiosInstance.get(`/admins/events/${eventId}/requests`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching requests for event with ID ${eventId}:`, error);
      throw error;
    }
  }

  // Get all event requests
  async getAllEventRequests() {
    try {
      const response = await this.httpClient.axiosInstance.get('/admins/events/requests');
      return response.data;
    } catch (error) {
      console.error('Error fetching all event requests:', error);
      throw error;
    }
  }

  // Make an event request
  async createEventRequest(eventId, vendorId) {
    try {
      const response = await this.httpClient.axiosInstance.post(`/vendors/events/${eventId}/requests/${vendorId}`);
      return response.data;
    } catch (error) {
      console.error('Error creating event request:', error);
      throw error;
    }
  }

  // Accept or reject an event request
  async updateEventRequest(requestId, requestData) {
    try {
      const response = await this.httpClient.axiosInstance.put(`/admins/events/requests/${requestId}`, requestData);
      return response.data;
    } catch (error) {
      console.error(`Error updating event request with ID ${requestId}:`, error);
      throw error;
    }
  }
}
