import AdminsRepository from './AdminsRepository.js';

export default class AdminsService {
  constructor(httpClient) {
    this.httpClient = httpClient;
    this.adminsRepository = new AdminsRepository(httpClient);
  }

  async authenticateAdmin(adminData) {
    const response = await this.adminsRepository.authenticateAdmin(adminData);
    this.httpClient.processCookie();
    return response;
  }

  async createAdmin(adminData) {
    return await this.adminsRepository.createAdmin(adminData);
  }
}
