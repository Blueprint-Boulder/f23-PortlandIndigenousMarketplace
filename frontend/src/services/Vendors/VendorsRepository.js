import axios from 'axios';
export default class VendorsRepository {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getAllVendors() {
    try {
      const response = await axios.get(`${this.baseUrl}/vendors`);
      return response.data;
    } catch (error) {
      console.error('Error fetching vendors:', error);
      throw error;
    }
  }

  async getVendorById(vendorId) {
    try {
      const response = await axios.get(`${this.baseUrl}/vendors/${vendorId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching vendor with ID ${vendorId}:`, error);
      throw error;
    }
  }

  async authenticateVendor(vendorData) {
    try {
      const response = await axios.post(`${this.baseUrl}/vendors/login`, vendorData);
      return response.data;
    } catch (error) {
      console.error('Error logging in vendor:', error);
      throw error;
    }
  }

  async createVendor(vendorData) {
    try {
      const response = await axios.post(`${this.baseUrl}/vendors`, vendorData);
      return response.data;
    } catch (error) {
      console.error('Error creating vendor:', error);
      throw error;
    }
  }

  async updateVendor(vendorId, vendorData) {
    try {
      const response = await axios.put(`${this.baseUrl}/vendors/${vendorId}`, vendorData);
      return response.data;
    } catch (error) {
      console.error(`Error updating vendor with ID ${vendorId}:`, error);
      throw error;
    }
  }

  async deleteVendor(vendorId) {
    try {
      const response = await axios.delete(`${this.baseUrl}/vendors/${vendorId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting vendor with ID ${vendorId}:`, error);
      throw error;
    }
  }
}
