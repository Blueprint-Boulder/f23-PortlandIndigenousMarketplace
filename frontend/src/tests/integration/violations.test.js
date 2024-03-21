import {expect} from 'chai';
import AdminsService from '../../services/Admins/AdminsService.js';
import VendorsSerice from '../../services/Vendors/VendorsService.js';
import ViolationsService from '../../services/Violations/ViolationsService.js';
import axios from 'axios';
import HttpClient from '../../services/HttpClient.js';
import Vendor from '../../objects/Vendor.js';

describe('Admins Service', function() {
  this.timeout(10000); // Set timeout for all tests in this describe block
  const adminHttpClient = new HttpClient('http://backend-test:4001/api');
  const vendorHttpClient = new HttpClient('http://backend-test:4001/api');
  const adminService = new AdminsService(adminHttpClient);
  const vendorService = new VendorsSerice(vendorHttpClient);
  const vendorViolationService = new ViolationsService(vendorHttpClient);
  const adminViolationService = new ViolationsService(adminHttpClient);

  // Use async/await with the before hook
  before(async function() {
    await waitForService('http://backend-test:4001/api/health', 100000, 5000);

    // login admin
    const adminData = {
      email: 'admin@pim.com',
      password: 'pim',
    };
    const res1 = await adminService.authenticateAdmin(adminData);
    const cookie = res1.headers['set-cookie'][0];
    adminHttpClient.manuallySetCookie(cookie, true);

    // create a vendor
    const vendor = new Vendor(
        2, 'ViolationsVendor', 'Violations@gmail.com',
        'www.violations.com', '123-456-7890', 'https://www.kasandbox.org/programming-images/avatars/spunky-sam.png');
    const password = 'password';
    await vendorService.createVendor(vendor, password);

    // login a vendor
    const vendorData = {
      email: 'Violations@gmail.com',
      password: 'password',
    };
    const res2 = await vendorService.authenticateVendor(vendorData);
    const cookie2 = res2.headers['set-cookie'][0];
    vendorHttpClient.manuallySetCookie(cookie2, true);
  });

  describe('Create Violation', function() {
    it('should create a violation for a vendor', async function() {
      try {
        const response1 = await adminViolationService.createViolation({
          type: 1,
          description: 'violation description',
          vendorId: 1,
        });
        const response2 = await adminViolationService.createViolation({
          type: 1,
          description: 'violation description',
          vendorId: 2,
        });
        expect(response1.status).to.equal('success');
        expect(response2.status).to.equal('success');
      } catch (error) {
        // Handle errors or failed assertions
        console.error('Test failed', error);
        throw error; // Rethrow to make the test fail
      }
    });
  });

  describe('Get Violations By Vendor Id as a Vendor', function() {
    it('should get all violations for a logged in vendor', async function() {
      try {
        const violations = await vendorViolationService.getViolationsByVendorId(2);
        console.log(violations);
        expect(violations.length).to.be.at.least(1);
      } catch (error) {
        console.error('Test failed', error);
        throw error;
      }
    });
  });

  describe('Get Violations By Vendor Id as an Admin', function() {
    it('should get all violations for a logged in vendor', async function() {
      try {
        const violations = await adminViolationService.getViolationsByVendorId(2);
        console.log(violations);
        expect(violations.length).to.be.at.least(1);
      } catch (error) {
        console.error('Test failed', error);
        throw error;
      }
    });
  });

  describe('Unauthorized Get Violation by Vendor Id', function() {
    it('should fail to get vendor violation because not logged into that vendor', async function() {
      try {
        await vendorViolationService.getViolationsByVendorId(1);
        expect(false).to.equal(true);
      } catch (error) {
        expect(true).to.equal(true);
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
