const express = require('express');
const db = require('../database');

const bcrypt = require('bcryptjs');
const {hash, genSalt} = require('bcryptjs');

const getEventRequests = async (req, res, next) => {
    try {
        const requests = await db.manyOrNone(
            'SELECT * FROM EventRequests WHERE event_id = $1',
            [req.params.eventId],
        );
    
        if (requests.length) {
            res.locals.data = requests;
            next();
        } else {
            res.status(404).json({message: 'No requests found for this event.'});
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
};

const getAllEventRequests = async (req, res, next) => {
    try {
        const requests = await db.manyOrNone(
            'SELECT * FROM EventRequests',
        );
    
        if (requests.length) {
            res.locals.data = requests;
            next();
        } else {
            res.status(404).json({message: 'No requests found for this event.'});
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

const getViolationsByVendorId = async (req, res, next) => {
    try {
        const violations = await db.manyOrNone(
            'SELECT * FROM Violations WHERE vendor_id = $1',
            [req.params.vendorId],
        );
    
        if (violations.length) {
            res.locals.data = violations;
            next();
        } else {
            res.status(404).json({message: 'No violations found for this vendor.'});
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

const getAllViolations = async (req, res, next) => {
    try {
        const violations = await db.manyOrNone('SELECT * FROM Violations');
    
        if (violations.length) {
            res.locals.data = violations;
            next();
        } else {
            res.status(404).json({message: 'No violations found.'});
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

const createVendorViolation = async (req, res, next) => {
    try {
        const {type, description, vendor_id} = req.body;

        await db.none(
            'INSERT INTO Violations (type, description, vendor_id) VALUES ($1, $2, $3)',
            [type, description, vendor_id],
        );
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Error creating violation.'});
    }
}

const deleteVendorViolation = async (req, res, next) => {
    try {
        await db.none(
            'DELETE FROM Violations WHERE violation_id = $1',
            [req.params.violationId],
        );
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

const processEventRequest = async (req, res, next) => {
    try {
        await db.none(
            'UPDATE EventRequests SET approved = $1 WHERE request_id = $2',
            [req.body.approved, req.params.requestId],
        );
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

// Middleware given an email in the body, retireves the given admin
// account or returns an error
const getAdminByEmail = async (req, res, next) => {
  try {
    const data = await db.oneOrNone('SELECT * FROM Admins WHERE email = $1', [
      req.body.email,
    ]);

    if (data) {
      res.locals.admin = data;

      next();
    } else {
      res.status(401).json({message: 'Email not found.'});
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
};

// Middleware to create a new admin account.
// If used, should be an admin route. i.e. allow Lluvia
// to create a new admin account if wanted.
const createAdmin = async (name, email, password) => {
  const salt = await genSalt(10);
  const hashed = await hash(password, salt);

  return await db.one(
      'INSERT INTO Admins (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, hashed],
  );
};

const createAdminMiddleware = async (req, res, next) => {
  try {
    const {name, email, password} = req.body;

    if (name === undefined || email === undefined || password === undefined) {
      console.log(req.body);
      res.status(400).json({error: 'Missing required fields'});
      return;
    }

    const data = await createAdmin(name, email, password);

    res.locals.data = data;

    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'Internal Server Error'});
    return;
  }
};

const authenticateAdmin = async (req, res, next) => {
    try {
        const {password} = req.body;
        const {admin} = res.locals;
        
        if (admin === undefined) {
            return res.status(401).json({message: 'Unauthorized: Admin'});
        }
        
        const match = await bcrypt.compare(password, admin.password);
        
        if (match) {
            res.locals.data = {
                'message': 'Login successful',
                'status': 'success',
            };
            next();
        } else {
            res.status(401).json({message: 'Incorrect admin email or password.'});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    
    }
}

module.exports = {
    getEventRequests,
    getAllEventRequests,
    getViolationsByVendorId,
    getAllViolations,
    createVendorViolation,
    deleteVendorViolation,
    processEventRequest,
    getAdminByEmail,
    createAdminMiddleware,
    authenticateAdmin,
};