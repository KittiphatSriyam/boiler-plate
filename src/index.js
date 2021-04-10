import React from "react";
import ReactDOM from "react-dom";
import MmPage from "./page/mm-page";

import "./scss/app.scss";

const App = () => {
  return <MmPage />;
};
ReactDOM.render(<App />, document.getElementById("app"));
