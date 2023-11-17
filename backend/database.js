// Import the pg-promise library and initialize it
const pgp = require('pg-promise')();

// Connect to the database using the environment variable DATABASE_URL
if (process.env.DATABASE_URL === undefined) {
  throw new Error('DATABASE_URL environment variable not set');
}

const db = pgp(process.env.DATABASE_URL);

/*
The database object above represents a connection to our database. However,
it isn't actually connected yet. The object is an abstraction of the connection.
When you run a query against db, it will automatically connect to the database
and release it when its finished.

This database object should be the only one in the application. We import
the file where we need to make queries.
*/

module.exports = db;
