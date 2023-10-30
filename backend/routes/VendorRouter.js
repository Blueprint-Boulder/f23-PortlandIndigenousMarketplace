const express = require('express');

const router = express.Router();

const {getUser, createUser} = require('VendorController.js');

//Logs in vendor
router.post('/login', getUser);

//Registers vendor
router.post('/register', createUser);

module.exports = router;