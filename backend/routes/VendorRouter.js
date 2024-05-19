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
  uploadProfilePic,
  verifyVendorHasSameVendorId,
} = require('../controllers/VendorController');

const {
  getViolationsByVendorId
} = require('../controllers/AdminController');

const sendSuccessResponse = require('../middleware/successResponse');
const {
  signToken,
  verify,
  canEditVendor
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
router.post('/events/:eventId/requests/:vendorId', verify('vendor'), canEditVendor, createEventRequest, sendSuccessResponse);

// Get Vendor event request
router.get('/events/requests', verify('admin'), getEventRequest, sendSuccessResponse);

// Edit vendor by id
// This probably should be an admin-protected route. How does that work?
router.put('/:vendorId', verify('admin'), updateVendor, sendSuccessResponse);

router.get('/violations/:vendorId', verify('vendor'), canEditVendor, getViolationsByVendorId, sendSuccessResponse);

// Route for vendor to update themself. ID is retrieved from the token.
router.put('/', verify('vendor'), updateAuthenticatedVendor, sendSuccessResponse);

// Upload vendor photo by id ( checks for admin or vendorId match )
router.post('/:vendorId/image', verify('vendor'), canEditVendor, uploadProfilePic, sendSuccessResponse);

// Upload Vendor Photo (probably for admin use)
// router.post('/:vendorId/image');

// Get Vendor Photo URL
router.get('/:vendorId/image');

module.exports = router;
