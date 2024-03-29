export default class VendorsRepository {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  async getAllVendors() {
    try {
      const response = await this.httpClient.axiosInstance.get('/vendors');
      return response.data;
    } catch (error) {
      console.error('Error fetching vendors');
      return undefined;
    }
  }

  async getVendorById(vendorId) {
    try {
      const response = await this.httpClient.axiosInstance.get(`/vendors/${vendorId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching vendor with ID ${vendorId}:`);
      return undefined;
    }
  }

  async authenticateVendor(vendorData) {
    try {
      const response = await this.httpClient.axiosInstance.post('vendors/login', vendorData);
      console.log(response.headers['set-cookie']);
      return response;
    } catch (error) {
      console.error('Error logging in vendor:');
      return undefined;
    }
  }

  async createVendor(vendorData) {
    try {
      const response = await this.httpClient.axiosInstance.post('/vendors', vendorData);
      return response.data;
    } catch (error) {
      console.error('Error creating vendor:');
      return undefined;
    }
  }

  async updateSelfVendor(vendorData) {
    try {
      const response = await this.httpClient.axiosInstance.put('/vendors', vendorData);
      return response.data;
    } catch (error) {
      console.error('Error updating vendor:');
      return undefined;
    }
  }

  async updateVendor(vendorId, vendorData) {
    try {
      const response = await this.httpClient.axiosInstance.put(`/vendors/${vendorId}`, vendorData);
      return response.data;
    } catch (error) {
      console.error(`Error updating vendor with ID ${vendorId}:`);
      return undefined;
    }
  }

  async deleteVendor(vendorId) {
    try {
      const response = await this.httpClient.axiosInstance.delete(`/vendors/${vendorId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting vendor with ID ${vendorId}:`);
      return undefined;
    }
  }

  async logout() {
    try {
      const response = await this.httpClient.axiosInstance.post('/logout');
      return response.data;
    } catch (error) {
      console.error('Error logging out:');
      return undefined;
    }
  }
}
