import "./App.css";

import React, { Fragment } from "react";

//components

import Input from "./components/Input";
import List from "./components/List";
import Total from "./components/Total";

function App() {
  return (
    <Fragment>
      <div className="container">
        <Input />
        <List />
        <Total />
      </div>
    </Fragment>
  );
}

export default App;
