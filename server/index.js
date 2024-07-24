const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// middleware
app.use(cors());
app.use(express.json());

//ROUTES//

// Add a shift

app.post("/shifts", async (req, res) => {
  try {
    const data = req.body;
    const newData = await pool.query(
      "INSERT INTO shifts (hourly_wage, worked_hours, worked_minutes, break_hours, break_minutes, total_worked_hours, net_pay, details) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        data["hourly_wage"],
        data["worked_hours"],
        data["worked_minutes"],
        data["break_hours"],
        data["break_minutes"],
        data["total_worked_hours"],
        data["net_pay"],
        data["details"],
      ]
    );

    res.json(newData.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Get all shift

app.get("/shifts", async (req, res) => {
  try {
    const getAllData = await pool.query(
      "SELECT * FROM shifts ORDER BY tdy_date ASC"
    );

    res.json(getAllData.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Get a shift

app.get("/shifts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await pool.query("SELECT * FROM shifts WHERE shift_id = $1", [
      id,
    ]);

    res.json(data.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// edit a shift

app.put("/shifts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updateData = await pool.query(
      "UPDATE shifts SET worked_hours = $2, worked_minutes = $3, break_hours = $4, break_minutes = $5, total_worked_hours = $6, net_pay = $7, details = $8, hourly_wage = $9, tdy_date = $10, paid = $11 WHERE  shift_id = $1",
      [
        id,
        data["worked_hours"],
        data["worked_minutes"],
        data["break_hours"],
        data["break_minutes"],
        data["total_worked_hours"],
        data["net_pay"],
        data["details"],
        data["hourly_wage"],
        data["today_date"],
        data["paid"],
      ]
    );

    res.json(data);
  } catch (err) {
    console.error(err.message);
  }
});

// edit hourly wage

app.put("/", async (req, res) => {
  try {
    const data = req.body;
    const updateWage = await pool.query(
      "ALTER TABLE shifts ALTER hourly_wage SET DEFAULT $1",
      [data["hourly_wage"]]
    );

    res.json("Hourly wage has updated");
  } catch (err) {
    console.error(err.message);
  }
});

// delete a shift

app.delete("/shifts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteData = await pool.query(
      "DELETE FROM shifts WHERE shift_id = $1",
      [id]
    );

    res.json("The shift was deleted");
  } catch (err) {
    console.error(err.message);
  }
});

// launch server

app.listen(3333, () => {
  console.log("Server 3333 is now open");
});
