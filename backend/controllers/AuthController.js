const jwt = require('jsonwebtoken');

// This middleware will be used to sign the token after a user logs in
const signToken = async (req, res, next) => {
  // Sign the token with JWT_SECRET
  const token = jwt.sign(res.locals.vendor, process.env.JWT_SECRET);
  // Return the token in a cookie
  res.cookie('auth', token, {httpOnly: true, secure: false});

  next();
};

// This middleware will be used to verify the token sent by the client
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

module.exports = {signToken, verifyToken};
