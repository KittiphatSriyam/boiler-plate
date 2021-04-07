import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import "./scss/app.scss";

const App = () => {
  const [eleApprover, setEleApprover] = useState([]);
  const [empID, setEmpID] = useState("");

  const addApprover = () => {
    setEleApprover([
      ...eleApprover,
      <div className="form-group row mt-3" key={eleApprover.length}>
        <div className="offset-2 col-8">
          <input type="text" className="form-control" name="approver" />
        </div>
      </div>,
    ]);
  };
  const handleSubmit = () => {
    let approver = document.querySelectorAll('input[name="approver"]');
    let approverIsEmpty = true;
    let allApprover = "";
    approver.forEach((element) => {
      if (
        (element.value != "") &
        (element.value != null) &
        (element.value != undefined)
      ) {
        approverIsEmpty = false;
      }
      allApprover += `${element.value};`;
    });

    if (approverIsEmpty) {
      alert("กรุณากรอกผู้อนุมัติอย่างน้อย 1 คน");
    }

    if (empID == "" || empID == null || empID == undefined) {
      alert("กรุณากรอกผู้รหัสผู้ใช้งาน");
    }
  };
  const setStateEmpID = (e) => {
    setEmpID(e.target.value.trim());
    findDataUserById(empID);
  };
  const findDataUserById = async (empID) => {
    fetch("http://kcetweb/MM/add_flow/backend/getProfileByID.asp", {
      method: "GET",
      body: JSON.stringify({}),
    }).then((response) => {
      console.log("response->>", response);
    });
  };
  useEffect(() => {}, [eleApprover]);

  return (
    <div className="container">
      <div className="col-8 mx-auto mt-5">
        <div className="card border-dark mb-3 px-5 py-5">
          <div className="card-body text-dark">
            <h5 className="card-title mb-5">MM ( Flow )</h5>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">EmpID :</label>
              <div className="col-10">
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setStateEmpID(e)}
                />
              </div>
            </div>
            <div className="form-group row mt-3">
              <label className="col-2 col-form-label">Approver :</label>
              <div className="col-8">
                <input type="text" className="form-control" name="approver" />
              </div>
              <div className="col-2">
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={() => addApprover()}
                >
                  Add
                </button>
              </div>
            </div>
            {eleApprover}
            <button
              type="button"
              className="btn btn-dark btn-lg btn-block col-12 mt-5"
              onClick={() => handleSubmit()}
            >
              SUBMIT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
