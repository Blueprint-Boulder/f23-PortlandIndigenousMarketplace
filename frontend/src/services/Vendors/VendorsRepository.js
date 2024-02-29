export default class VendorsRepository {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  async getAllVendors() {
    try {
      const response = await this.httpClient.axiosInstance.get('/vendors');
      return response.data;
    } catch (error) {
      console.error('Error fetching vendors:');
      throw error;
    }
  }

  async getVendorById(vendorId) {
    try {
      const response = await this.httpClient.axiosInstance.get(`/vendors/${vendorId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching vendor with ID ${vendorId}:`);
    }
  }

  async authenticateVendor(vendorData) {
    try {
      const response = await this.httpClient.axiosInstance.post('vendors/login', vendorData);
      // if (response.status == 200) {
      //   this.httpClient.processCookie(response.headers['set-cookie'][0]);
      // } else {
      //   throw new Error('Failed to authenticate vendor');
      // }
      this.httpClient.processCookie();
      return response;
    } catch (error) {
      console.error('Error logging in vendor:');
    }
  }

  async createVendor(vendorData) {
    try {
      const response = await this.httpClient.axiosInstance.post('/vendors', vendorData);
      return response.data;
    } catch (error) {
      console.error('Error creating vendor:');
      throw error;
    }
  }

  async updateSelfVendor(vendorData) {
    try {
      const response = await this.httpClient.axiosInstance.put('/vendors', vendorData);
      return response.data;
    } catch (error) {
      console.error('Error updating vendor:');
      throw error;
    }
  }

  async updateVendor(vendorId, vendorData) {
    try {
      const response = await this.httpClient.axiosInstance.put(`/vendors/${vendorId}`, vendorData);
      return response.data;
    } catch (error) {
      console.error(`Error updating vendor with ID ${vendorId}:`);
      throw error;
    }
  }

  async deleteVendor(vendorId) {
    try {
      const response = await this.httpClient.axiosInstance.delete(`/vendors/${vendorId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting vendor with ID ${vendorId}:`);
      throw error;
    }
  }

  async logout() {
    try {
      const response = await this.httpClient.axiosInstance.post('/logout');
      return response.data;
    } catch (error) {
      console.error('Error logging out:');
      throw error;
    }
  }
}
