const express = require('express');
const router = express.Router();
const {
  getVendor,
  getVendors,
  createVendor,
  getVendorById,
  authenticateVendor,
  updateVendor,
} = require('../controllers/VendorController');
const sendSuccessResponse = require('../middleware/successResponse');

// Logs in vendor
router.post('/login', getVendor, authenticateVendor, sendSuccessResponse);

// Fetches all vendors
router.get('/', getVendors, sendSuccessResponse);

// Fetches a single vendor by ID
router.get('/:vendorId', getVendorById, sendSuccessResponse);

// Creates a new vendor
router.post('/', createVendor, (req, res) => {
  res.status(200).json({status: 'success'});
});

router.put('/:vendorId', updateVendor, sendSuccessResponse);

module.exports = router;
