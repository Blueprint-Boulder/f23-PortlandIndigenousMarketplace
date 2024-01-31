const {
  verifyAdminToken,
  signAdminToken,
  verify,
} = require('../controllers/AuthController');
const {getAdminByEmail, createAdminMiddleware} = require('../controllers/AdminController');

// Import express
const express = require('express');

// Create a router for admin authentication
const router = express.Router();

router.post('/login', getAdminByEmail, signAdminToken, (req, res) => {
  res.status(200).json({status: 'success'});
});

// UNFINISHED: Create an admin account
// router.post('/', createAdminMiddleware, (req, res) => {
//   res.status(200).json({status: 'success', admin: res.locals.data});
// });

module.exports = router;
