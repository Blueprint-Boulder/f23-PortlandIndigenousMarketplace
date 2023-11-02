const express = require('express')
const app = express();

// Load the environment variables from the project root directory (Parent of the current directory). This only needs to be ran once for the entire project.
require('dotenv').config({ path: '../.env'});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//The backend should be listening on port 3000 within its container, but the container's port 3000 is mapped externally to 3001.
// TL;DR the backend is running on port 3001 on the host machine. 
app.listen(process.env.BACKEND_PORT, () => {
  console.log(`Example app listening on port ${process.env.BACKEND_PORT}`)
})