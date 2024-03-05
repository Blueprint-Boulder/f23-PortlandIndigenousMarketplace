export default class AdminsRepository {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }
  async authenticateAdmin(adminData) {
    try {
      const response = await this.httpClient.axiosInstance.post('admins/login', adminData);
      return response;
    } catch (error) {
      console.error('Error logging in admin:');
    }
  }

  async createAdmin(adminData) {
    try {
      const response = await this.httpClient.axiosInstance.post('/admins', adminData);
      return response.data;
    } catch (error) {
      console.error('Error creating admin:');
      throw error;
    }
  }
}
