// Import the pg-promise library and initialize it
const pgp = require('pg-promise')();

var db;

if (process.env.NODE_ENV === undefined) {
  throw new Error('NODE_ENV environment variable not set');
}
if (process.env.DATABASE_URL === undefined || process.env.DATABASE_TEST_URL === undefined) {
  throw new Error('DATABASE_URL or DATABASE_TEST_URL environment variable not set');
}

// Connect to the database using the environment variable DATABASE_URL
if (process.env.NODE_ENV === 'test') {
  console.log('Connecting to database using url: ' + process.env.DATABASE_TEST_URL);
  var db = pgp(process.env.DATABASE_TEST_URL);
}
else {
  console.log('Connecting to database using url: ' + process.env.DATABASE_URL);
  var db = pgp(process.env.DATABASE_URL);
}

/*
The database object above represents a connection to our database. However,
it isn't actually connected yet. The object is an abstraction of the connection.
When you run a query against db, it will automatically connect to the database
and release it when its finished.

This database object should be the only one in the application. We import
the file where we need to make queries.
*/

module.exports = db;
