import React, { Fragment, useEffect, useState } from "react";

const Total = () => {
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
            <th>Total Worked Hours</th>
            <th>Net Pay</th>
          </tr>
        </thead>
        {
          <tr>
            <td>
              {shifts.reduce(
                (totalPay, shift) =>
                  totalPay + parseFloat(shift.total_worked_hours),
                0
              )}
            </td>
            <td>
              {shifts.reduce(
                (totalPay, shift) => totalPay + parseFloat(shift.net_pay),
                0
              )}
            </td>
          </tr>
        }
      </table>
    </Fragment>
  );
};

export default Total;
