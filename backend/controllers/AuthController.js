const jwt = require('jsonwebtoken');

const db = require('../database');

// TODO: Set cookies to secure when https is ready?

// This middleware will be used to sign the token after a vendor logs in
const signToken = async (req, res, next) => {
  if (res.locals.vendor === undefined) {
    return res.status(401).json({message: 'Unauthorized: Vendor'});
  }

  // Sign the token with JWT_SECRET
  const token = await jwt.sign(res.locals.vendor, process.env.JWT_SECRET);
  // Return the token in a cookie
  res.cookie('auth', token, {secure: false});

  // console.log('Token:', token);

  next();
};

// This middleware will be used to verify the token sent by the vendor
const verifyToken = async (req, res, next) => {
  // Retrieve the token from the cookie
  const token = req.cookies.auth;

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  // Verify the token with JWT_SECRET
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      res.status(401).json({message: 'Unauthorized: vendor1'});
    } else {
      // Update cookie data from database
      db.oneOrNone('SELECT * FROM vendors WHERE vendor_id = $1', [decoded.vendor_id], (result, err) => {
        if (err) {
          res.status(500).json({message: 'Internal Server Error'});
        } else if (result === null) {
          res.status(401).json({message: 'Unauthorized: Vendor2'});
        }

        res.locals.vendor = result;
        // Remove the password - isn't needed for any other processes.
        delete res.locals.vendor['password'];

        // Sign new token and continue
        signToken(req, res, next);
      });
    }
  });
};

// This middleware will be used to sign the token after an admin logs in
const signAdminToken = async (req, res, next) => {
  if (res.locals.admin === undefined) {
    return res.status(401).json({message: 'Unauthorized: Admin'});
  }

  // Remove admin password from cookie
  delete res.locals.admin['password'];

  // Sign the token with JWT_SECRET
  const token = await jwt.sign(res.locals.admin, process.env.JWT_SECRET);

  // Return the token in a cookie
  res.cookie('auth_pim', token, {secure: false});

  next();
};

const verifyAdminToken = async (req, res, next) => {
  // Retrieve the token from the cookie
  const token = req.cookies.auth_pim;

  // Verify the token with JWT_SECRET
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({message: 'Unauthorized: Admin'});
    } else {
      // Keep the cookie up to date with the database
      db.oneOrNone('SELECT * FROM admins WHERE admin_id = $1', [decoded.admin_id], (result, err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({message: 'Internal Server Error'});
        } else if (result === undefined) {
          return res.status(401).json({message: 'Unauthorized: Admin.'});
        }

        console.log(result);

        res.locals.admin = result;
        delete res.locals.admin['password'];

        // Sign new token and continue
        signAdminToken(req, res, next);
      });
    }
  });
};

// Returns a middleware to verify the user has the correct permissions.
// Setting a route that only admins can access.
// USAGE: router.get('/route', verify('admin'), controller.method);
const verify = (privilege) => {
  if (privilege === 'admin') {
    // Check the admin token
    return verifyAdminToken;
  } else if (privilege === 'vendor') {
    // Check the vendor token
    return verifyToken;
  } else {
    // You shouldn't need to set privilege for any other use case.
    throw new Error('Privilege should be either vendor or admin.');
  }
};

module.exports = {signToken, verifyToken, verifyAdminToken, signAdminToken, verify};
