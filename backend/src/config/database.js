const { Pool } = require('pg');

const pool = new Pool({
  connectionString: "postgres://postgres:pgpassword@localhost:5432/WeddingPlanner"
});

module.exports = {
  query: (text, params) => pool.query(text, params),
}
