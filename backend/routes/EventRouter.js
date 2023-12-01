const express = require('express');
const router = express.Router();
const {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
} = require('../controllers/EventController');
const sendSuccessResponse = require('../middleware/successResponse');

// Get all events
router.get('/', getAllEvents, sendSuccessResponse);

// Get a single event by ID
router.get('/:event_id', getEventById, sendSuccessResponse);

// Create a new event
router.post('/', createEvent, sendSuccessResponse);

// Update an existing event
router.put('/:event_id', updateEvent, sendSuccessResponse);

module.exports = router;
