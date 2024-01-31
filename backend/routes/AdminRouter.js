const express = require('express');
const router = express.Router();

// Auth Controller Imports
const {
  verifyAdminToken,
  signAdminToken,
  verify,
} = require('../controllers/AuthController');

// Admin Controller Imports
const {
    getEventRequests,
    getAllEventRequests,
    getViolations,
    getAllViolations,
    createVendorViolation,
    deleteVendorViolation,
    processEventRequest,
    getAdminByEmail,
    createAdminMiddleware,
} = require('../controllers/AdminController');

const sendSuccessResponse = require('../middleware/successResponse');

router.get('/events/requests/:eventId', verify('admin'), getEventRequests, sendSuccessResponse);

router.get('/events/requests', verify('admin'), getAllEventRequests, sendSuccessResponse);

router.get('/violations/:vendorId', verify('admin'), getViolations, sendSuccessResponse);

router.get('/violations', verify('admin'), getAllViolations, sendSuccessResponse);

router.put('events/requests/:requestId', verify('admin'), processEventRequest, sendSuccessResponse);

router.post('/violations/:vendorId', verify('admin'), createVendorViolation, sendSuccessResponse);

router.delete('/violations/:violationId', verify('admin'), deleteVendorViolation, sendSuccessResponse);

router.post('/login', getAdminByEmail, signAdminToken, (req, res) => {
  res.status(200).json({status: 'success'});
});

// UNFINISHED: Create an admin account
// Useful for creating an admin account for testing purposes. Password in database needs to be hashed for login to work properly.
// router.post('/', createAdminMiddleware, (req, res) => {
//   res.status(200).json({status: 'success', admin: res.locals.data});
// });

module.exports = router;
