const express = require('express');
// const pgp = require('pg-promise')();
const db = require('../database');

// const {hash, genSalt} = require('bcryptjs');
// const bcrypt = require('bcryptjs');

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
const createAdmin = (name, email, password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  return db.one(
      'INSERT INTO Admins (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, hash],
  );
};

module.exports = {getAdminByEmail, createAdmin};
