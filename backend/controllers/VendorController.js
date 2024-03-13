const express = require('express');
const pgp = require('pg-promise')();
const db = require('../database');

const {hash, genSalt} = require('bcryptjs');
const bcrypt = require('bcryptjs');

const getVendor = async (req, res, next) => {
  try {
    const data = await db.oneOrNone('SELECT * FROM Vendors WHERE email = $1', [
      req.body.email,
    ]);

    if (data) {
      res.locals.data = data;
      next();
    } else {
      res.status(401).json({message: 'Email does not exist.'});
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
};

// Middleware to verify the password of the vendor
const authenticateVendor = async (req, res, next) => {
  try {

    const vendor = res.locals.data;
    const email = req.body.email;
    const password = req.body.password;

    if (email === undefined || password === undefined) {
      res.status(401).json({message: 'Missing email or password'});
      return;
    }
    const match = await bcrypt.compare(password, vendor.password);

    // If passwords match, pass vendor object without password
    if (match) {
      res.locals.vendor = vendor;
      delete res.locals.vendor['password'];

      res.locals.data = {
        'message': 'Login successful',
        'status': 'success',
      };

      next();
    } else {
      res.status(401).json({message: 'Incorrect email or password.'});
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
};

const getVendors = async (req, res, next) => {
  try {
    // Retrieve all vendors from the database
    const vendors = await db.manyOrNone('SELECT * FROM Vendors');

    // If vendors are found, add them to res.locals.data
    if (vendors.length) {
      res.locals.data = vendors;
      next(); // Proceed to the next middleware or route handler
    } else {
      // If no vendors are found, send a message indicating this
      res.status(404).json({message: 'No vendors found'});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
};

const getVendorById = async (req, res, next) => {
  const {vendorId} = req.params;

  try {
    const vendor = await db.oneOrNone(
        'SELECT * FROM Vendors WHERE vendor_id = $1',
        [vendorId],
    );
    if (vendor) {
      // Store the vendor data in res.locals.data for the middleware
      res.locals.data = vendor;
      next(); // Pass control to the next middleware
    } else {
      res.status(404).json({message: 'Vendor not found'});
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
};

// Registers the vendor in the database
const createVendor = async (req, res, next) => {
  // Get the values from the request body
  const {name, email, phoneNumber, password, website} = req.body;

  // Checks if the required fields are present
  if (!password || !email || !name) {
    console.log(req.body);
    return res.status(400).json({
      error: 'Missing required fields',
      data: req.body,
    });
  }

  // Hashes the password using bcrypt
  let passwordHash;
  try {
    const salt = await genSalt(10);
    passwordHash = await hash(password, salt);
  } catch (err) {
    console.log(err);
    res.status(495).json({error: "Error hashing password"});
    return;
  }

  // Inserts the vendor into the database
  try {
    await db.none(
        'INSERT INTO Vendors (\
                name, \
                email, \
                phone_number, \
                password, \
                website\
            ) VALUES ($1, $2, $3, $4, $5)',
        [name, email, phoneNumber, passwordHash, website],
    );
  } catch (err) {
    // Duplicate emails are not allowed
    if (err.code === '23505') {
      res
          .status(400)
          .json({error: 'A vendor with that email already exists'});
      return;
    }

    // Other internal error
    console.log(err);
    res.status(500).json({error: "Internal Server Error"});
    return;
  }

  next();
};

const createEventRequest = async (req, res, next) => {
  const {vendorId, eventId} = req.body;

  try {
    await db.none(
        'INSERT INTO EventRequests (vendor_id, event_id) VALUES ($1, $2)',
        [vendorId, eventId],
    );
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
};

const getEventRequest = async (req, res, next) => {
  const {requestId, vendorId, eventId} = req.body;
  if (requestId) {
    try {
      const eventRequest = db.oneOrNone(
          'SELECT * FROM Event_Requests WHERE request_id = $1',
          [requestIdId],
      );
      if (eventRequest) {
        // Store the vendor data in res.locals.data for the middleware
        res.locals.data = eventRequest;
        next(); // Pass control to the next middleware
      } else {
        res.status(404).json({message: 'Event Request not found'});
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({error: 'Internal Server Error'});
    }
  } else if (vendorId && eventId) {
    try {
      const eventRequest = db.oneOrNone(
          'SELECT * FROM Event_Requests WHERE vendor_id = $1 AND event_id = $2',
          [vendorId, eventId],
      );
      if (eventRequest) {
        // Store the vendor data in res.locals.data for the middleware
        res.locals.data = eventRequest;
        next(); // Pass control to the next middleware
      } else {
        res.status(404).json({message: 'Event Request not found'});
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({error: 'Internal Server Error'});
    }
  } else {
    res.status(400).json({error: 'Missing required fields'});
  }
};

const updateAuthenticatedVendor = async (req, res, next) => {
  const vendor = res.locals.vendor;

  // Values that are actually being updated
  const keys = [];
  const values = {};
  for (const key in req.body) {
    if (req.body[key]) {
      keys.push(key);
      values[key] = req.body[key];
    }
  }

  // Use a helper to generate set of columns for the query
  const cs = new pgp.helpers.ColumnSet(keys, {table: 'vendors'});
  // Generate the query
  const query = pgp.helpers.update(values, cs) + ' WHERE vendor_id = $1';

  // Update the vendor in the database
  try {
    await db.none(query, [vendor.vendor_id]);
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
};

const updateVendor = async (req, res, next) => {
  const {vendorId} = req.params;
  const {
    name,
    email,
    phone_number,
    password,
    website,
  } = req.body;

  // Hashes the password using bcrypt
  let passwordHash;
  try {
    const salt = await genSalt(10);
    passwordHash = await hash(password, salt);
  } catch (err) {
    console.log(err);
    res.status(500).json({error: err});
    return;
  }

  try {
    await db.none(
        'UPDATE Vendors SET \
                name = $1, \
                email = $2, \
                phone_number = $3, \
                password = $4, \
                website = $5 \
            WHERE vendor_id = $6',
        [name, email, phone_number, passwordHash, website, vendorId],
    );
  } catch (err) {
    // Duplicate emails are not allowed
    if (err.code === '23505') {
      res.status(400).json({error: 'A vendor with that email already exists'});
      return;
    }

    // Other internal error
    console.log(err);
    res.status(500).json({error: err});
    return;
  }

  next();
};

const verifyVendorHasSameVendorId = async (req, res, next) => {
  const vendor = res.locals.vendor;
  const vendorId = Number(req.params.vendorId);
  console.log("Vendor:", vendor);
  console.log("Vendor ID:", vendorId);

  if (vendor.vendor_id === vendorId) {
    console.log("Vendor has same vendor ID");
    next();
  } else {
    console.log("TruthValue:", vendor.vendor_id === vendorId)
    res.status(403).json({error: 'Forbidden'});
  }
}

module.exports = {
  getVendor,
  getVendors,
  createVendor,
  getVendorById,
  authenticateVendor,
  createEventRequest,
  getEventRequest,
  updateVendor,
  updateAuthenticatedVendor,
  verifyVendorHasSameVendorId
};
