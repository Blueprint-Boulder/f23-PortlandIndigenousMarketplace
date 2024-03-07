export default class ViolationsRepository {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  async getViolationsByVendorId(vendorId) {
    try {
      const response = await this.httpClient.axiosInstance.get(`/vendors/violations/${vendorId}`);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(`Error fetching violations for vendor with ID ${vendorId} as vendor:`);
    }

    try {
      const response = await this.httpClient.axiosInstance.get(`/admins/violations/${vendorId}`);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(`Error fetching violations for vendor with ID ${vendorId} as admin:`);
    }

    throw new Error(`Could not fetch violations for ID ${vendorId}`);
  }

  async createViolation(violationData) {
    try {
      const response = await this.httpClient.axiosInstance.post('/admins/violations', violationData);
      return response.data;
    } catch (error) {
      console.error('Error creating violation:', error);
      throw error;
    }
  }

  async updateViolation(violationId, violationData) {
    try {
      const response = await this.httpClient.axiosInstance.put(`/admins/violations/${violationId}`, violationData);
      return response.data;
    } catch (error) {
      console.error(`Error updating violation with ID ${violationId}:`, error);
      throw error;
    }
  }
}
