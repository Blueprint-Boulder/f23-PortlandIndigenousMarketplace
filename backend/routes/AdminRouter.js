const {
  verifyAdminToken,
  signAdminToken,
  verify,
} = require('../controllers/AuthController');
const {getAdminByEmail} = require('../controllers/AdminController');

// Import express
const express = require('express');

// Create a router for admin authentication
const router = express.Router();

router.post('/login', getAdminByEmail, signAdminToken, (req, res) => {
  res.status(200).json({status: 'success'});
});

// UNFINISHED: Create an admin account
// router.post('/', verify('admin'), signAdminToken, (req, res) => {
//     res.status(200).json({status: 'success'});
// });

module.exports = router;
