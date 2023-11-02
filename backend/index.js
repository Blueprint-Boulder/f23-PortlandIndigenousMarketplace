const express = require('express')
const app = express();

// Load the environment variables from the .env file in the backend root folder 
if(require('dotenv').config().parsed === undefined) 
  throw new Error("Could not load environment variables");

// Import the database object from the database.js file
const db = require('./database');

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//The backend should be listening on port 3000 within its container, but the container's port 3000 is mapped externally to 3001.
// TL;DR the backend is running on port 3001 on the host machine. 
app.listen(process.env.BACKEND_PORT, () => {
  console.log(`PIM backend app listening on port ${process.env.BACKEND_PORT}`)
})