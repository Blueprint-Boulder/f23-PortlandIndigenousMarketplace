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
} = require('../controllers/VendorController');
const sendSuccessResponse = require('../middleware/successResponse');
const {
  verifyToken,
  signToken,
} = require('../controllers/AuthController');

// Logs in vendor
router.post('/login', getVendor, authenticateVendor, signToken, sendSuccessResponse);

// Fetches all vendors
router.get('/', getVendors, sendSuccessResponse);

// Fetches a single vendor by ID
router.get('/:vendorId', getVendorById, sendSuccessResponse);

// Creates a new vendor
router.post('/', createVendor, (req, res) => {
  res.status(200).json({status: 'success'});
});

// Create Vendor event request
router.post('/events/request', createEventRequest, sendSuccessResponse);

// Get Vendor event request
router.get('/events/request', getEventRequest, sendSuccessResponse);

// Edit vendor by id
router.put('/:vendorId', verifyToken, updateVendor, sendSuccessResponse);

module.exports = router;
