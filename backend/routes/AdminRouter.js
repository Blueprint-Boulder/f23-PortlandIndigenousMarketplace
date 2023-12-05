const express = require('express');
const router = express.Router();

const {
    getEventRequests,
    getAllEventRequests,
    getViolations,
    getAllViolations,
    createVendorViolation,
    deleteVendorViolation,
    processEventRequest,
} = require('../controllers/AdminController');

const sendSuccessResponse = require('../middleware/successResponse');

router.get('/events/requests/:eventId', getEventRequests, sendSuccessResponse);

router.get('/events/requests', getAllEventRequests, sendSuccessResponse);

router.get('/violations/:vendorId', getViolations, sendSuccessResponse);

router.get('/violations', getAllViolations, sendSuccessResponse);

router.put('events/requests/:requestId', processEventRequest, sendSuccessResponse);

router.post('/violations/:vendorId', createVendorViolation, sendSuccessResponse);

router.delete('/violations/:violationId', deleteVendorViolation, sendSuccessResponse);

module.exports = router;