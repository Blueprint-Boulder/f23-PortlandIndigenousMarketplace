const express = require('express')

const VendorRouter = require('routes/VendorRouter');

const app = express()
const port = 3000

app.use('/vendor', VendorRouter);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})