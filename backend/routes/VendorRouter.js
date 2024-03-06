const express = require('express');
const router = express.Router();
const {
  getVendor,
  getVendors,
  createVendor,
  getVendorById,
  authenticateVendor,
  createEventRequest,
  getEventRequest,
  updateVendor,
  updateAuthenticatedVendor,
} = require('../controllers/VendorController');
const sendSuccessResponse = require('../middleware/successResponse');
const {
  signToken,
  verify,
} = require('../controllers/AuthController');

// Logs in vendor
router.post('/login', getVendor, authenticateVendor, signToken, sendSuccessResponse);

// Fetches all vendors
router.get('/', getVendors, sendSuccessResponse);

// Fetches a single vendor by ID
router.get('/:vendorId', getVendorById, sendSuccessResponse);

// Creates a new vendor
router.post('/', createVendor, sendSuccessResponse);

// Create Vendor event request
router.post('/events/request', verify('vendor'), createEventRequest, sendSuccessResponse);

// Get Vendor event request
router.get('/events/request', verify('admin'), getEventRequest, sendSuccessResponse);

// Edit vendor by id
// This probably should be an admin-protected route. How does that work?
router.put('/:vendorId', verify('admin'), updateVendor, sendSuccessResponse);

// Route for vendor to update themself. ID is retrieved from the token.
router.put('/', verify('vendor'), updateAuthenticatedVendor, sendSuccessResponse);

module.exports = router;
