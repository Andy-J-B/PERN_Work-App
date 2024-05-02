const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "PcomESLy05@",
  host: "localhost",
  port: 5432,
  database: "pern_work_app",
});

module.exports = pool;
