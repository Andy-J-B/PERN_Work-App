import React, { Fragment, useState } from "react";

const Editshift = ({ shift }) => {
  // total_worked_hours DECIMAL,
  // net_pay DECIMAL,
  const [today_date, set_today_date] = useState(shift.tdy_date);
  const [hourly_wage, set_hourly_wage] = useState(
    parseFloat(shift.hourly_wage)
  );
  const [worked_hours, set_worked_hours] = useState(
    parseFloat(shift.worked_hours)
  );
  const [worked_minutes, set_worked_minutes] = useState(
    parseFloat(shift.worked_minutes)
  );
  const [break_hours, set_break_hours] = useState(
    parseFloat(shift.break_hours)
  );
  const [break_minutes, set_break_minutes] = useState(
    parseFloat(shift.break_minutes)
  );
  const [details, set_details] = useState(shift.details);

  // Edit description function

  const updateDescription = async (e) => {
    e.preventDefault();
    try {
      const body = {
        today_date,
        hourly_wage,
        worked_hours,
        worked_minutes,
        break_hours,
        break_minutes,
        details,
      };

      let finalBody = {};
      for (var key in body) {
        if (key == "today_date" || key == "details") {
          continue;
        }
        finalBody[key] = parseFloat(body[key]);
      }
      finalBody["total_worked_hours"] =
        finalBody["worked_hours"] +
        finalBody["worked_minutes"] / 60 -
        finalBody["break_hours"] -
        finalBody["break_minutes"] / 60;
      finalBody["net_pay"] = parseFloat(
        (finalBody["total_worked_hours"] * finalBody["hourly_wage"]).toFixed(2)
      );
      finalBody["today_date"] = body["today_date"];
      finalBody["details"] = body["details"];
      console.log(finalBody);

      const response = await fetch(
        `http://localhost:3333/shifts/${shift.shift_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(finalBody),
        }
      );

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  const setAllValues = () => {
    set_today_date(shift.tdy_date);
    set_hourly_wage(shift.hourly_wage);
    set_worked_hours(shift.worked_hours);
    set_worked_minutes(shift.worked_minutes);
    set_break_hours(shift.break_hours);
    set_break_minutes(shift.break_minutes);
    set_details(shift.details);
  };

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${shift.shift_id}`}
      >
        Edit
      </button>

      <div className="modal" id={`id${shift.shift_id}`} onClick={setAllValues}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit shift</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={setAllValues}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <input
                type="datetime"
                className="form-control"
                value={today_date}
                onChange={(e) => set_today_date(e.target.value)}
              ></input>
              <input
                type="number"
                className="form-control"
                value={hourly_wage}
                onChange={(e) => set_hourly_wage(e.target.value)}
              ></input>
              <input
                type="number"
                className="form-control"
                value={worked_hours}
                onChange={(e) => set_worked_hours(e.target.value)}
              ></input>
              <input
                type="number"
                className="form-control"
                value={worked_minutes}
                onChange={(e) => set_worked_minutes(e.target.value)}
              ></input>
              <input
                type="number"
                className="form-control"
                value={break_hours}
                onChange={(e) => set_break_hours(e.target.value)}
              ></input>
              <input
                type="number"
                className="form-control"
                value={break_minutes}
                onChange={(e) => set_break_minutes(e.target.value)}
              ></input>
              <input
                type="text"
                className="form-control"
                value={details}
                onChange={(e) => set_details(e.target.value)}
              ></input>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
                onClick={(e) => updateDescription(e)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={setAllValues}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Editshift;
