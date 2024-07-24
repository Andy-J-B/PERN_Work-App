import React, { Fragment, useEffect, useState } from "react";

const Total = () => {
  const [shifts, setShifts] = useState([]);

  // delete shifts function

  const getShifts = async () => {
    try {
      const response = await fetch("http://localhost:3333/shifts");
      const jsonData = await response.json();

      setShifts(jsonData);
    } catch (err) {
      console.log(err.message);
    }
  };

  const recievablePay = (shifts) => {
    var totalRecievable = 0;
    for (var i = 0; i < shifts.length; i++) {
      if (!shifts[i].paid) {
        totalRecievable += parseFloat(shifts[i].net_pay);
      }
    }
    return totalRecievable;
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
            <th>Unpaid Pay</th>
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
            <td>{recievablePay(shifts)}</td>
          </tr>
        }
      </table>
    </Fragment>
  );
};

export default Total;
