const jwt = require('jsonwebtoken');

// TODO: Set cookies to secure when https is ready?

// This middleware will be used to sign the token after a vendor logs in
const signToken = async (req, res, next) => {
  // Sign the token with JWT_SECRET
  const token = jwt.sign(res.locals.vendor, process.env.JWT_SECRET);
  // Return the token in a cookie
  res.cookie('auth', token, {httpOnly: true, secure: false});

  next();
};

// This middleware will be used to verify the token sent by the vendor
const verifyToken = async (req, res, next) => {
  // Retrieve the token from the cookie
  const token = req.cookies.auth;

  // Verify the token with JWT_SECRET
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).json({message: 'Unauthorized'});
    } else {
      // Add the decoded object to res.locals
      res.locals.vendor = decoded;
      next();
    }
  });
};

// This middleware will be used to sign the token after an admin logs in
const signAdminToken = async (req, res, next) => {
  // Sign the token with JWT_SECRET
  const token = jwt.sign(res.locals.admin, process.env.JWT_SECRET);

  // Return the token in a cookie
  res.cookie('auth_pim', token, {httpOnly: true, secure: false});

  next();
};

const verifyAdminToken = async (req, res, next) => {
  // Retrieve the token from the cookie
  const token = req.cookies.auth_pim;

  // Verify the token with JWT_SECRET
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({message: 'Unauthorized'});
    } else {
      // Add the decoded object to res.locals
      res.locals.admin = decoded;
      next();
    }
  });
};

// Returns a middleware to verify the user has the correct permissions.
// Setting a route that only admins can access.
// USAGE: router.get('/route', verify('admin'), controller);
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
