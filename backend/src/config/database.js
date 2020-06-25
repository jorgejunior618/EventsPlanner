const { Pool } = require('pg');

const pool = new Pool({
  connectionString: "postgres://postgres:pgpassword@localhost:5432/EventsPlanner"
});

module.exports = {
  query: (text, params) => pool.query(text, params),
}
