const express = require('express');
const db = require('../database');
const {hash, genSalt} = require('bcryptjs');
const bcrypt = require('bcryptjs');

const getAllEvents = async (req, res, next) => {
  // If vendorId is non-null, return only events that the vendor is attending
  const vendorId = req.query.vendorId;
  
  // The query to use if vendorId !== null
  const vendor_querystr = `SELECT E.* FROM Events AS E \
  LEFT JOIN EventRequests AS R ON E.event_id = R.event_id \
  WHERE R.vendor_id = $1 AND R.approved = true`;

  let events = undefined;
  
  // Execute query
  if(vendorId){
    try {
      events = await db.manyOrNone(vendor_querystr, vendorId);
    } catch (error) {
      console.error(error);
      res.status(500).json({error: 'Failed to retrieve events for vendor.'});
    }
  } else {
    try {
      events = await db.manyOrNone("SELECT * FROM Events");
    } catch (error) {
      console.error(error);
      res.status(500).json({error: 'Failed to retrieve events.'});
    }
  }

  // Check the number of events returned
  if (events.length) {
    res.locals.data = events;
    next();
  } else {
    res.status(404).json({message: 'No events found'});
  }
};

const getEventById = async (req, res, next) => {
  const {event_id} = req.params;
  try {
    const event = await db.oneOrNone('SELECT * FROM Events WHERE event_id = $1', [event_id]);
    if (event) {
      res.locals.data = event;
      next();
    } else {
      res.status(404).json({message: 'Event not found'});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
};

const createEvent = async (req, res, next) => {
  const {name, location, starttime, endtime, description, vendorCapacity} = req.body;
  try {
    const event = await db.one(`
      INSERT INTO Events (name, location, starttime, endtime, description, vendorCapacity)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `, [name, location, starttime, endtime, description, vendorCapacity]);

    // Returns the created event
    res.locals.data = event;

    next();
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({error: 'Internal Server Error'});
  }
};

const updateEvent = async (req, res, next) => {
  const {event_id} = req.params;
  const {name, location, starttime, endtime, description, vendorCapacity} = req.body;
  try {
    const result = await db.one(`
      UPDATE Events
      SET 
        name = $1, 
        location = $2, 
        starttime = $3, 
        endtime = $4,
        description = $5, 
        vendorCapacity = $6
      WHERE event_id = $7
      RETURNING *;
    `, [name, location, starttime, endtime, description, vendorCapacity, event_id]);

    if (!result) {
      return res.status(404).json({error: 'Event not found'});
    } else {
      res.locals.data = result;
      next();
    }
  } catch (error) {
    console.error('Error editing event:', error);
    return res.status(500).json({error: 'Internal Server Error'});
  }
};

const deleteEvent = async (req, res, next) => {
  const {event_id} = req.params;
  try {
    const result = await db.oneOrNone('DELETE FROM Events WHERE event_id = $1 RETURNING *;', [event_id]);
    if (!result) {
      return res.status(404).json({error: 'Event not found'});
    } else {
      res.locals.data = result;
      next();
    }
  } catch (error) {
    console.error('Error deleting event:', error);
    return res.status(500).json({error: 'Internal Server Error'});
  }
}

// Get vendors attending a specific event
const getAttendingVendors = async (req, res, next) => {
  const {event_id} = req.params;
  try {
    const vendors = await db.manyOrNone(`
    SELECT 
        V.vendor_id,
        V.name,
        V.phone_number,
        V.website,
        V.email,
        V.image
    FROM 
        vendor_full V
    JOIN 
        EventRequests ER ON V.vendor_id = ER.vendor_id
    WHERE 
        ER.event_id = $1 AND 
        ER.approved = TRUE;
    `, [event_id]);

    if (vendors.length) {
      res.locals.data = vendors;
      next();
    } else {
      res.status(404).json({message: 'No vendors found for this event'});
    }
  } catch (error) {
    console.error('Error fetching attending vendors:', error);
    res.status(500).json({error: 'Internal Server Error'});
  }
}

module.exports = {getAllEvents, getEventById, createEvent, updateEvent, deleteEvent, getAttendingVendors};
