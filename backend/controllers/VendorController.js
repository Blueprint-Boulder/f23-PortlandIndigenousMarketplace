const express = require('express');
const db = require('../database');

const {hash, genSalt} = require('bcrypt');

const getVendor = (req, res, next) => {

};

//Registers the vendor in the database
const createVendor = async (req, res, next) => {
    //Get the values from the request body
    const {
        name,
        email,
        phone_number,
        password,
        website
    } = req.body;

    //Hashes the password using bcrypt
    let password_hash = undefined;
    try {
        const salt = await genSalt(10);
        password_hash = await hash(password, salt);
    } catch(err){
        console.log(err);
        res.status(500).json({error: err});
        return;
    }

    //Inserts the vendor into the database
    try{
        await db.none(
            'INSERT INTO Vendors (\
                name, \
                email, \
                phone_number, \
                password, \
                website\
            ) VALUES ($1, $2, $3, $4, $5)', 
            [name, email, phone_number, password_hash, website]
        );
    } catch(err){
        if(err.code === '23505'){
            res.status(400).json({error: 'A vendor with that email already exists'});
            return;
        }

        console.log(err);
        res.status(500).json({error: err});
        return;
    }
    
    next();
};


module.exports = {getVendor, createVendor}