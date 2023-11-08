const express = require('express');
const router = express.Router();
const { getVendor, getVendors, createVendor, getVendorById, authenticateVendor } = require('../controllers/VendorController');
const bcrypt = require('bcryptjs');
const sendSuccessResponse = require('../middleware/successResponse');


//Logs in vendor
router.post('/login', getVendor, authenticateVendor, sendSuccessResponse);

router.get('/', getVendors, sendSuccessResponse);

// Fetches a single vendor by ID
router.get('/:user_id', getVendorById, sendSuccessResponse);

//Creates a new vendor
router.post('/', createVendor, (req, res) => {
    res.status(200).json({ status: 'success' });
});

module.exports = router;