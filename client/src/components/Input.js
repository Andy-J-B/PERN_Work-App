import React, { Fragment, useState } from "react";

const Input = () => {
  const initialValues = {
    hourly_wage: "",
    worked_hours: "",
    worked_minutes: "",
    break_hours: "",
    break_minutes: "",
  };
  const initialDetails = "";
  const [details, set_details] = useState(initialDetails);

  //    total_worked_hours: ""     net_pay: "",
  const [allValues, setAllValues] = useState(initialValues);

  const changeHandler = (e) => {
    setAllValues({ ...allValues, [e.target.name]: parseFloat(e.target.value) });
  };

  const detailHandler = (e) => {
    set_details({ ...details, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { allValues };
      const detailedStr = { details };
      console.log(detailedStr["details"]["details"]);
      const total_worked_hours =
        body["allValues"]["worked_hours"] +
        body["allValues"]["worked_minutes"] / 60 -
        body["allValues"]["break_hours"] -
        body["allValues"]["break_minutes"] / 60;
      const net_pay = (
        total_worked_hours * body["allValues"]["hourly_wage"]
      ).toFixed(2);
      body["allValues"]["total_worked_hours"] = total_worked_hours;
      body["allValues"]["net_pay"] = parseFloat(net_pay);
      body["allValues"]["details"] = detailedStr["details"]["details"];
      console.log(body);
      const response = await fetch("http://localhost:3333/shifts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body["allValues"]),
      });
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className="text-center mt-5">Work Log</h1>

      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input
          type="number"
          id="hourly_wage"
          name="hourly_wage"
          className="form-control"
          value={allValues.hourly_wage}
          onChange={changeHandler}
          placeholder="Hourly Wage"
        ></input>
        <input
          type="number"
          id="worked_hours"
          name="worked_hours"
          className="form-control"
          value={allValues.worked_hours}
          onChange={changeHandler}
          placeholder="Worked hours"
        ></input>
        <input
          type="number"
          id="worked_minutes"
          name="worked_minutes"
          className="form-control"
          value={allValues.worked_minutes}
          onChange={changeHandler}
          placeholder="Worked Minutes"
        ></input>
        <input
          type="number"
          id="break_hours"
          name="break_hours"
          className="form-control"
          value={allValues.break_hours}
          onChange={changeHandler}
          placeholder="Break Hours"
        ></input>
        <input
          type="number"
          id="break_minutes"
          name="break_minutes"
          className="form-control"
          value={allValues.break_minutes}
          onChange={changeHandler}
          placeholder="Break Minutes"
        ></input>
        <input
          type="text"
          id="details"
          name="details"
          className="form-control"
          value={allValues.details}
          onChange={detailHandler}
          placeholder="Details"
        ></input>
        <button className="btn btn-success">Add</button>
      </form>
    </Fragment>
  );
};

export default Input;
