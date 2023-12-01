const express = require('express');
const db = require('../database');
const { hash, genSalt } = require('bcryptjs');
const bcrypt = require('bcryptjs');

const getAllEvents = async (req, res, next) => {
  try {
    const events = await db.manyOrNone('SELECT * FROM Events');
    if (events.length) {
      res.locals.data = events;
      next();
    } else {
      res.status(404).json({ message: 'No events found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getEventById = async (req, res, next) => {
  const { event_id } = req.params;
  try {
    const event = await db.oneOrNone('SELECT * FROM Events WHERE event_id = $1', [event_id]);
    if (event) {
      res.locals.data = event;
      next();
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createEvent = async (req, res, next) => {
  const { name, location, datetime, description } = req.body;
  try {
    const result = await db.query(`
      INSERT INTO Events (name, location, datetime, description)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `, [name, location, datetime, description]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateEvent = async (req, res, next) => {
  const { event_id } = req.params;
  const { name, location, datetime, description } = req.body;
  try {
    const result = await db.query(`
      UPDATE Events
      SET name = $1, location = $2, datetime = $3, description = $4
      WHERE event_id = $5
      RETURNING *;
    `, [name, location, datetime, description, event_id]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Event not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error('Error editing event:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getAllEvents, getEventById, createEvent, updateEvent };
