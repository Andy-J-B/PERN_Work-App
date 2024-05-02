import React, { Fragment, useEffect, useState } from "react";
import Edit from "./Edit.js";

const List = () => {
  const [shifts, setShifts] = useState([]);

  // delete shifts function

  const formatDate = (date) => {
    const newDate = date.substr(0, date.indexOf("T"));
    return newDate;
  };

  const deleteShift = async (id) => {
    try {
      const deleteShift = await fetch(`http://localhost:3333/shifts/${id}`, {
        method: "DELETE",
      });

      // Make it refresh page

      setShifts(shifts.filter((shift) => shift.shift_id !== id)); // filters shifts
    } catch (err) {
      console.error(err.message);
    }
  };

  const getShifts = async () => {
    try {
      const response = await fetch("http://localhost:3333/shifts");
      const jsonData = await response.json();

      setShifts(jsonData);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getShifts();
  }, []);

  return (
    <Fragment>
      {" "}
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Date of Input</th>
            <th>Hourly Wage</th>
            <th>Total Worked Hours</th>
            <th>Net Pay</th>
            <th>Details</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {shifts.map((shift) => (
            <tr key={shift.shift_id}>
              <td>{formatDate(shift.tdy_date)}</td>
              <td>{shift.hourly_wage}</td>
              <td>{shift.total_worked_hours}</td>
              <td>{shift.net_pay}</td>
              <td>{shift.details}</td>
              <td>
                <Edit shift={shift} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteShift(shift.shift_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default List;
