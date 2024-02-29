import {expect} from 'chai';
import AdminsService from '../../services/Admins/AdminsService.js';
import axios from 'axios';
import HttpClient from '../../services/HttpClient.js';

describe('Admins Service', function() {
  this.timeout(10000); // Set timeout for all tests in this describe block
  const httpClient = new HttpClient('http://backend-test:4001/api');
  const adminService = new AdminsService(httpClient);

  // Use async/await with the before hook
  before(async function() {
    await waitForService('http://backend-test:4001/api/health', 100000, 5000);
  });

  describe('Login Admin', function() {
    it('should login an admin', async function() {
      const adminData = {
        email: 'admin@pim.com',
        password: 'pim',
      };
      try {
        const response = await adminService.authenticateAdmin(adminData);
        const cookie = response.headers['set-cookie'][0];
        httpClient.manuallySetCookie(cookie, true);
        expect(response.status).to.equal(200);
      } catch (error) {
        // Handle errors or failed assertions
        console.error('Test failed', error);
        throw error; // Rethrow to make the test fail
      }
    });
  });
});

// Function to wait for the backend service to be ready
async function waitForService(url, timeout = 5000, interval = 1000) {
  console.log(`Waiting for service at ${url} to be ready...`);
  const startTime = Date.now();

  while (true) {
    try {
      await axios.get(url);
      console.log(`Service at ${url} is ready.`);
      break; // Exit loop if request succeeds
    } catch (error) {
      console.log(`Service at ${url} is not ready yet: ${error.message}`);
      if (Date.now() - startTime > timeout) {
        throw new Error(`Service at ${url} did not become ready in time: ${error.message}`);
      }
      await new Promise((resolve) => setTimeout(resolve, interval)); // Wait before next attempt
    }
  }
}
