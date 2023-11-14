const express = require('express');
const db = require('../database');

const {hash, genSalt} = require('bcryptjs');
const bcrypt = require('bcryptjs');

const getVendor = async (req, res, next) => {
  try {
    const data = await db.oneOrNone(
        'SELECT * FROM Vendors WHERE email = $1',
        [req.body.email],
    );

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

// Middleware to authenticate the vendor
const authenticateVendor = async (req, res, next) => {
  try {
    const vendor = res.locals.data;
    const match = await bcrypt.compare(req.body.password, vendor.password);
    if (match) {
      // If the password matches, store a success message and relevant vendor data
      res.locals.data = {
        status: 'success',
        message: 'Successful login.',
        vendorDetails: {
          id: vendor.id,
          email: vendor.email,
          // TODO: Include any other vendor details we need
        },
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
  const {
    name,
    email,
    phone_number,
    password,
    website,
  } = req.body;

  // Checks if the required fields are present
  if (!password || !email || !name) {
    console.log(req.body);
    return res.status(400).json({error: 'Missing required fields'});
  }

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
        [name, email, phone_number, passwordHash, website],
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

module.exports = {getVendor, getVendors, createVendor, getVendorById, authenticateVendor};
