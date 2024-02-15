import {expect} from 'chai';
import VendorsService from '../../services/Vendors/VendorsService.js';
import Vendor from '../../objects/Vendor.js';
import axios from 'axios';

describe('Vendors Service', function() {
  this.timeout(10000); // Set timeout for all tests in this describe block
  const vendorService = new VendorsService('http://backend-test:4001/api');

  // Use async/await with the before hook
  before(async function() {
    await waitForService('http://backend-test:4001/api/health', 100000, 5000);
  });

  describe('Add Vendor', function() {
    it('should add a vendor', async function() {
      const vendor = new Vendor(
          1, 'John Smith', 'John.smith@gmail.com',
          'www.johnsmith.com', '123-456-7890', 'https://www.kasandbox.org/programming-images/avatars/spunky-sam.png');
      const password = 'password';
      try {
        const res = await vendorService.createVendor(vendor, password);
        expect(res.status).to.equal('success');
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
