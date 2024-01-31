const express = require('express');
const db = require('../database');

const bcrypt = require('bcryptjs');
const {hash, genSalt} = require('bcryptjs');

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

module.exports = {getAdminByEmail, createAdminMiddleware};
