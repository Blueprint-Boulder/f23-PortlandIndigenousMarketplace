// Load the environment variables from the .env file in the backend root folder
if (require('dotenv').config().parsed === undefined) {
  throw new Error('Could not load environment variables');
}

// Import the database object from the database.js file
const db = require('./database');

// Import Express and initialize our app
const express = require('express');
const app = express();

// Parse Json requests
app.use(express.json());

const errorHandler = require('errorhandler');
app.use(errorHandler({dumbExceptions: true, showStack: true}));

// Allows cross origin requests
const cors = require('cors');
app.use(cors());

// Parses cookies attached to the client request object
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Import router objects and direct the app to use them
const VendorRouter = require('./routes/VendorRouter');

app.use('/vendors', VendorRouter);

app.get('/', (req, res) => {
  res.status(202).send('Hello World!');
});

/*
The backend should be listening on port 3000 within its container,
but the container's port 3000 is mapped externally to 3001.

TL;DR the backend is running on port 3001 on the host machine.
*/

app.listen(process.env.BACKEND_PORT, () => {
  console.log(`PIM backend app listening on port ${process.env.BACKEND_PORT}`);
});
