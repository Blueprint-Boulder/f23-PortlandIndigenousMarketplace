const express = require('express');
const router = express.Router();
const {
  getVendor,
  getVendors,
  getPublicVendors,
  createVendor,
  getVendorById,
  getPublicVendorById,
  getSelfVendor,
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
router.get('/', verify('admin'), getVendors, sendSuccessResponse);

// Fetches public vendors
router.get('/public', getPublicVendors, sendSuccessResponse);

// Fetches a single vendor by ID
router.get('/:vendorId', getVendorById, sendSuccessResponse);

// Fetches a single vendor by ID that is public
router.get('/public/:vendorId', verify('admin'), getPublicVendorById, sendSuccessResponse);

// Fetches vendor that is self
router.get('/self', verify('vendor'), getSelfVendor, sendSuccessResponse);

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
