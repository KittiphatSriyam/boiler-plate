import React from "react";
import ReactDOM from "react-dom";
import "./scss/app.scss";

const App = () => (
  <div className="text-center">
    Hello
    <div className="mb-3">
      <label className="form-label">Email segse</label>
      <input
        type="email"
        className="form-control"
        id="exampleFormControlInput1"
        placeholder="name@example.com"
      />
    </div>
  </div>
);

ReactDOM.render(<App />, document.getElementById("app"));
