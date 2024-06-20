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

  async getPublicVendors() {
    try {
      const response = await this.httpClient.axiosInstance.get('/vendors/public');
      return response.data;
    } catch (error) {
      console.error('Error fetching public vendors');
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

  async getPublicVendorById(vendorId) {
    try {
      const response = await this.httpClient.axiosInstance.get(`/vendors/public/${vendorId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching public vendor with ID ${vendorId}:`);
      return undefined;
    }
  }

  async getSelfVendor() {
    try {
      const response = await this.httpClient.axiosInstance.get('/vendors/self');
      return response.data;
    } catch (error) {
      console.error('Error fetching self vendor:');
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

  async uploadProfileImage(vendorId, image) {
    // Create a formdata object and add the Profile Image as "img"
    const formData = new FormData();
    formData.append('img', image);

    try {
      const res = await this.httpClient.axiosInstance.post(`/vendors/${vendorId}/image`, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      return res.data;
    } catch (error) {
      console.error(`Error uploading profile image.`);
      console.error(error);
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
