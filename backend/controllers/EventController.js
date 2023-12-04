const express = require('express');
const db = require('../database');
const {hash, genSalt} = require('bcryptjs');
const bcrypt = require('bcryptjs');

const getAllEvents = async (req, res, next) => {
  try {
    const events = await db.manyOrNone('SELECT * FROM Events');
    if (events.length) {
      res.locals.data = events;
      next();
    } else {
      res.status(404).json({message: 'No events found'});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Internal Server Error'});
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
  const {name, location, datetime, description, capacity} = req.body;
  try {
    await db.none(`
      INSERT INTO Events (name, location, datetime, description, vendor_capacity)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `, [name, location, datetime, description, capacity]);

    next();
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({error: 'Internal Server Error'});
  }
};

const updateEvent = async (req, res, next) => {
  const {event_id} = req.params;
  const {name, location, datetime, description, capacity} = req.body;
  try {
    const result = await db.one(`
      UPDATE Events
      SET 
        name = $1, 
        location = $2, 
        datetime = $3, 
        description = $4, 
        vendor_capacity = $5
      WHERE event_id = $6
      RETURNING *;
    `, [name, location, datetime, description, capacity, event_id]);

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

module.exports = {getAllEvents, getEventById, createEvent, updateEvent};
