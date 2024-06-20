const express = require('express');
const pgp = require('pg-promise')();
const db = require('../database');

const {hash, genSalt} = require('bcryptjs');
const bcrypt = require('bcryptjs');

// Imports for file uploading
const {v4} = require('uuid');
const mime = require('mime-types');
const multer  = require('multer');

// Delete old profile image
const { unlink } = require('node:fs/promises');

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

    console.log(`Filename: ${fileName}`);

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

const getPublicVendors = async (req, res, next) => {
  try {
    // Retrieve all public vendors from the database
    const vendors = await db.manyOrNone(
        'SELECT * FROM vendor_full WHERE is_public = TRUE',
    );
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

const getPublicVendorById = async (req, res, next) => {
  const {vendorId} = req.params;

  try {
    const vendor = await db.oneOrNone(
        'SELECT * FROM vendor_full WHERE vendor_id = $1 AND is_public = TRUE',
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

const getSelfVendor = async (req, res, next) => {
  const vendor = res.locals.vendor;

  try {
    const selfVendor = await db.oneOrNone(
        'SELECT * FROM vendor_full WHERE vendor_id = $1',
        [vendor.vendor_id],
    );
    if (selfVendor) {
      // Store the vendor data in res.locals.data for the middleware
      res.locals.data = selfVendor;
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
  const {name, email, phoneNumber, password, website, instagram, facebook, twitter, tiktok, youtube, pinterest, is_public} = req.body;

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
                website, \
                is_public,\
                instagram, \
                facebook, \
                twitter, \
                tiktok, \
                youtube,\
                pinterest \
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)',
        [name, email, phoneNumber, passwordHash, website, instagram, facebook, twitter, tiktok, youtube, pinterest, is_public],
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
    id,
    is_public,
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
                website = $5, \
                is_public = $6 \
            WHERE vendor_id = $7',
        [name, email, phone_number, passwordHash, website, is_public, vendorId],
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

// Upload a profile pic. If one exists for the vendor, remove it.
const uploadProfilePic = (req, res, next) => {
  console.log('called upload profile pic');
    
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
    // const vendor_id = res.locals.vendor['vendor_id'];
    const vendor_id = req.params.vendorId;

    // Get file name from request
    const uuid = req.uuid;
    const fileExt = req.fileExt;

    if(vendor_id == undefined || uuid == undefined || fileExt == undefined){
      console.log('Error - Missing fields for file upload.');
      return res.status(500).json({message: 'Bad request - one or more fields were not sent.'});
    }

    // Upload metadata to database
    try {
      await db.none(
        `INSERT INTO ProfilePictures (vendor_id, image_key, file_ext) VALUES ($1, $2, $3)`,
        [vendor_id, uuid, fileExt]);
    } catch (err) {
      // Duplicate emails are not allowed
      if (err !== undefined && err.code === '23505') {
        // Get the old profile image
        const old_file = await db.oneOrNone(
          `SELECT * FROM ProfilePictures WHERE vendor_id = $1`,
          [vendor_id]
        )

        // Delete old profile image in filesystem
        // https://nodejs.org/api/fs.html#promise-example
        const deleteStatus = (async function(path) {
          try {
            await unlink(path);
            console.log(`successfully deleted ${path}`);

            return true;
          } catch (error) {
            console.error('Failed to delete old profile image: ', error.message);
            res.status(500).json({msg: "Failed to delete old profile image", error: err});
            return false;
          }
        })(`/profilepics/${old_file['image_key']}.${old_file['file_ext']}`);

        if(deleteStatus){
          try{
            // Retry file upload
            await db.none(
              `INSERT INTO ProfilePictures (vendor_id, image_key, file_ext) VALUES ($1, $2, $3) ON CONFLICT (vendor_id) DO UPDATE SET vendor_id=$1, image_key=$2, file_ext=$3`,
              [vendor_id, uuid, fileExt]);

            console.log("Uploaded new image.");
            res.status(200).send();
          } catch (error){
            console.log(error);
            res.status(500).json({error: error});
            return;
          }
          
        } else {
          return;
        }
      }

      // If we didn't send a response by now, send generic fail?
      if(err != undefined && !res.headersSent){
        // Other internal error
        console.log(err);
        res.status(500).json({error: err});
        return;
      }
    }

    next();
  });
};

const verifyVendorHasSameVendorId = async (req, res, next) => {
  const vendor = res.locals.vendor;
  const vendorId = Number(req.params.vendorId);
  // console.log("Vendor:", vendor);
  // console.log("Vendor ID:", vendorId);

  if (vendor.vendor_id === vendorId) {
    // console.log("Vendor has same vendor ID");
    next();
  } else {
    console.log("Vendor trying to edit someone else");
    res.status(403).json({error: 'Forbidden'});
  }
}

module.exports = {
  getVendor,
  getVendors,
  getPublicVendors,
  createVendor,
  getVendorById,
  getPublicVendorById,
  getSelfVendor,
  authenticateVendor,
  createEventRequest,
  getEventRequest,
  updateVendor,
  updateAuthenticatedVendor,
  uploadProfilePic,
  verifyVendorHasSameVendorId
};
