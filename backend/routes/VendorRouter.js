const express = require('express');

const router = express.Router();

const {getVendor, createVendor} = require('../controllers/VendorController');

//Logs in vendor
router.post('/login', getVendor);

//Creates a new vendor
router.post('/', createVendor, (req, res) =>{
    res.status(200).json({status: 'success'});
});

module.exports = router;