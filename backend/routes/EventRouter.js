const express = require('express');
const router = express.Router();
const {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getAttendingVendors,
} = require('../controllers/EventController');
const sendSuccessResponse = require('../middleware/successResponse');
const {verify} = require('../controllers/AuthController');

// Get all events
router.get('/', getAllEvents, sendSuccessResponse);

// Get a single event by ID
router.get('/:event_id', getEventById, sendSuccessResponse);

// Create a new event
router.post('/', verify('admin'), createEvent, sendSuccessResponse);

// Update an existing event
router.put('/:event_id', verify('admin'), updateEvent, sendSuccessResponse);

router.delete('/:event_id', verify('admin'), deleteEvent, sendSuccessResponse);

router.get('/:event_id/vendors', getAttendingVendors, sendSuccessResponse);

module.exports = router;
