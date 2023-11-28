const express = require('express');
const router = express.router();

//Get all events
// router.get("/");
router.get('/', async (req, res) => {
    try {
      const result = await pool.query(`
        SELECT Events.*
        FROM Events
        JOIN Event_Requests ON Events.event_id = Event_Requests.event_id
        WHERE Event_Requests.vendor_id = $1;
      `, [req.query.vendor_id]);
  
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching vendor events:', error);
      res.status(500).send('Internal Server Error');
    }
  });

//Get a single event
// router.get("/:event_id");
router.get("/:event_id", async (req, res) => {
    const eventId = req.params.event_id;
  
    try {
      const result = await pool.query(`
        SELECT * FROM Events
        WHERE event_id = $1;
      `, [eventId]);
  
      if (result.rows.length === 0) {
        res.status(404).json({ error: 'Event not found' });
      } else {
        res.json(result.rows[0]);
      }
    } catch (error) {
      console.error('Error fetching event:', error);
      res.status(500).send('Internal Server Error');
    }
  });

//Create an event
// router.post("/");
router.post("/", async (req, res) => {
    const { name, location, datetime, description } = req.body;
  
    try {
      const result = await pool.query(`
        INSERT INTO Events (name, location, datetime, description)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `, [name, location, datetime, description]);
  
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error creating event:', error);
      res.status(500).send('Internal Server Error');
    }
  });

//Edit an existing event
// router.put("/:event_id");
router.put("/:event_id", async (req, res) => {
    const eventId = req.params.event_id;
    const { name, location, datetime, description } = req.body;
  
    try {
      const result = await pool.query(`
        UPDATE Events
        SET name = $1, location = $2, datetime = $3, description = $4
        WHERE event_id = $5
        RETURNING *;
      `, [name, location, datetime, description, eventId]);
  
      if (result.rows.length === 0) {
        res.status(404).json({ error: 'Event not found' });
      } else {
        res.json(result.rows[0]);
      }
    } catch (error) {
      console.error('Error editing event:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  

module.exports = router;