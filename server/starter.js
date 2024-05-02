import data from "./data.json";

const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// middleware
app.use(cors());
app.use(express.json());

//ROUTES//

var Dictionary = {}

for (var values in data) {
    for (let num = 0; num < 59; num++)
//   for (var key in data[values]) {
    Dictionary["worked_hours"] = data[values][num];
        Dictionary["worked_minutes"] = data[values][num];
        Dictionary["break_hours"] = data[values][num];
        Dictionary["break_minutes"]= data[values][num];
        Dictionary["total_worked_hours"];
        Dictionary["net_pay"];
        Dictionary["details"];
  }
// }

// Add a shift

app.post("/shifts", async (req, res) => {
  try {
    const data1 = ;
    const newData = await pool.query(
      "INSERT INTO shifts (worked_hours, worked_minutes, break_hours, break_minutes, total_worked_hours, net_pay, details) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [
        data1["worked_hours"],
        data1["worked_minutes"],
        data1["break_hours"],
        data1["break_minutes"],
        data1["total_worked_hours"],
        data1["net_pay"],
        data1["details"],
      ]
    );

    res.json(newData.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
