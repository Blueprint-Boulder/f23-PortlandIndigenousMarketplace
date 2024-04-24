const express = require('express');
const router = express.Router();

// Auth Controller Imports
const {
  signAdminToken,
  verify,
} = require('../controllers/AuthController');

// Admin Controller Imports
const {
    getEventRequests,
    getAllEventRequests,
    getViolationsByVendorId,
    getAllViolations,
    createVendorViolation,
    deleteVendorViolation,
    processEventRequest,
    getAdminByEmail,
    createAdminMiddleware,
    authenticateAdmin,
} = require('../controllers/AdminController');

const sendSuccessResponse = require('../middleware/successResponse');

router.get('/events/:eventId/requests', verify('admin'), getEventRequests, sendSuccessResponse);

router.get('/events/requests', verify('admin'), getAllEventRequests, sendSuccessResponse);

router.get('/violations/:vendorId', verify('admin'), getViolationsByVendorId, sendSuccessResponse);

router.get('/violations', verify('admin'), getAllViolations, sendSuccessResponse);

router.put('/events/requests/:requestId', verify('admin'), processEventRequest, sendSuccessResponse);

router.post('/violations', verify('admin'), createVendorViolation, sendSuccessResponse);

router.delete('/violations/:violationId', verify('admin'), deleteVendorViolation, sendSuccessResponse);

router.post('/login', getAdminByEmail, authenticateAdmin, signAdminToken, sendSuccessResponse);

// UNFINISHED: Create an admin account
// Useful for creating an admin account for testing purposes. Password in database needs to be hashed for login to work properly.
// router.post('/', createAdminMiddleware, (req, res) => {
//   res.status(200).json({status: 'success', admin: res.locals.data});
// });

// DELETE ROUTE IN PRODUCTION -- CREATE AN ADMIN ACCOUNT FOR TESTING PURPOSES
router.post('/', createAdminMiddleware, (req, res) => {
  res.status(200).json({status: 'success'});
});

module.exports = router;
