const express = require('express');
const pgp = require('pg-promise')();
const db = require('../database');

const {hash, genSalt} = require('bcryptjs');
const bcrypt = require('bcryptjs');

// Imports for file uploading
const {v4} = require('uuid');
const mime = require('mime-types');
const multer  = require('multer');

// TODO: add file upload limits
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("Destination called");
    cb(null, '/profilepics');
  },
  filename: function (req, file, cb) {
    const uuid = v4();
    const fileExt = mime.extension(file.mimetype);
    const fileName = `${uuid}.${fileExt}`;

    console.log("Filename called");

    req.uuid = uuid;
    req.fileExt = fileExt;

    cb(null, fileName);
  }
})
const upload = multer({ storage: storage }).single('img');

const getVendor = async (req, res, next) => {
  try {
    const data = await db.oneOrNone('SELECT * FROM vendor_full WHERE email = $1', [
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
    const vendors = await db.manyOrNone('SELECT * FROM vendor_full');

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
        'SELECT * FROM vendor_full WHERE vendor_id = $1',
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
  const {name, email, phoneNumber, password, website, instagram, facebook, twitter, tiktok, youtube, pinterest} = req.body;

  // Checks if the required fields are present, password is no longer required
  if (!email || !name) {
    console.log(req.body);
    return res.status(400).json({
      error: 'Missing required fields',
      data: req.body,
    });
  }

  // Don't think we necessarily need to change the password everytime, so I made it conditional

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
  try {
    await db.none(
        'INSERT INTO Vendors (\
                name, \
                email, \
                phone_number, \
                password, \
                website,\
                instagram, \
                facebook, \
                twitter, \
                tiktok, \
                youtube,\
                pinterest \
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
        [name, email, phoneNumber, passwordHash, website, instagram, facebook, twitter, tiktok, youtube, pinterest],
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
 
  // Inserts the vendor into the database
  
};

const createEventRequest = async (req, res, next) => {
  try {
    await db.none(
        'INSERT INTO EventRequests (vendor_id, event_id) VALUES ($1, $2)',
        [req.params.vendorId, req.params.eventId],
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
  console.log('request body: ', req.body);
  const {
    name,
    email,
    phoneNumber,
    website,
    instagram,
    facebook,
    twitter,
    tiktok,
    youtube,
    pinterest,
  } = req.body;

 
  if('password' in req.body){
    // Hashes the password using bcrypt
    const {password} = req.body;
    let passwordHash;
    try {
      const salt = await genSalt(10);
      passwordHash = await hash(password, salt);
    } catch (err) {
      console.log(err);
      res.status(495).json({error: "Error hashing password"});
      return;
    }
    try {
      await db.none(
          'UPDATE Vendors SET(\
                  name, \
                  email, \
                  phone_number, \
                  password, \
                  website,\
                  instagram, \
                  facebook, \
                  twitter, \
                  tiktok, \
                  youtube,\
                  pinterest\
              ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
          [name, email, phoneNumber, passwordHash, website, instagram, facebook, twitter, tiktok, youtube, pinterest],
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
  } else {
    try {
      await db.none(
          'UPDATE Vendors SET (\
                  name, \
                  email, \
                  phone_number, \
                  website,\
                  instagram, \
                  facebook, \
                  twitter, \
                  tiktok, \
                  youtube,\
                  pinterest \
              ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
          [name, email, phoneNumber, website, instagram, facebook, twitter, tiktok, youtube, pinterest],
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
  }

};

// Upload a profile pic. If one exists for the vendor, remove it.
const uploadProfilePic = (req, res, next) => {
  console.log(req.body);
  
  // img is the form field for the profile pic
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError){
      console.log("Multer error occurred handling file upload.");
      console.log(err);
      return res.status(500).json({error: err});
    } else if (err) {
      // Find out the difference between these two error conditions
      console.log(err);
      return res.status(500).json({error: err});
    }

    // Vendor id for database entry
    const vendor_id = res.locals.vendor['vendor_id'];

    // Get file name from request
    const uuid = req.uuid;
    const fileExt = req.fileExt;

    // Upload metadata to database
    try {
      await db.none(
        `INSERT INTO ProfilePictures (vendor_id, image_key, file_ext) VALUES ($1, $2, $3)`,
        [vendor_id, uuid, fileExt]);
    } catch (err) {
      // Duplicate emails are not allowed
      if (err.code === '23505') {
        res.status(400).json({error: 'This vendor already has a profile pic, or the UUID creation failed to be unique.'});
        return;
      }

      // TODO: If database entry fails, delete photo from filesystem!

      // Other internal error
      console.log(err);
      res.status(500).json({error: err});
      return;
    }

    next();
  });
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
  uploadProfilePic,
  verifyVendorHasSameVendorId
};
