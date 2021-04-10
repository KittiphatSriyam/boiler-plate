import React, { useEffect, useState } from "react";
import { isNotEmpty, isEmpty } from "../lib/utility";
import "../scss/mm-page.scss";

const MmPage = () => {
  const [eleApprover, setEleApprover] = useState([]);
  const [empID, setEmpID] = useState("");
  const [approveEmpID, setApproveEmpID] = useState("");
  const [profile, setProfile] = useState({});
  const [recMM, setRecMM] = useState({});
  const [canSubmit, setCanSubmit] = useState(false);
  const [approverNo, setApproverNo] = useState(1);

  const addApprover = () => {
    setApproverNo(approverNo + 1);
    setEleApprover([
      ...eleApprover,
      <div className="form-group row mt-3 input-approve" key={approverNo}>
        <div className="offset-2 col-8">
          <input
            type="text"
            className="form-control"
            name="approver"
            onChange={() => setCanSubmit(false)}
            onBlur={(event) =>
              getProfileApprover(event.target.value, approverNo)
            }
          />
          <small className="text-primary approver"></small>
        </div>
      </div>,
    ]);
  };
  const resetInputApprove = async () => {
    const inputApprove = document.querySelectorAll(".input-approve div input");

    for (let index = inputApprove.length - 1; index >= 0; index--) {
      if (isEmpty(inputApprove[index].value)) {
        document.querySelectorAll(".input-approve")[index].remove();
      }
    }
  };

  const handleSubmit = async () => {
    let approver = document.querySelectorAll("input[name='approver']");
    let approverIsEmpty = true;
    let allApprover = "";
    let loop = 0;
    approver.forEach((element) => {
      if (isNotEmpty(element.value)) {
        approverIsEmpty = false;
        allApprover += `${element.value};`;
        loop++;
      }
    });

    if (loop == 1) {
      allApprover = allApprover.replace(";", "");
    }

    if (approverIsEmpty) {
      alert("กรุณากรอกผู้อนุมัติอย่างน้อย 1 คน");
      setCanSubmit(false);
      return;
    }

    if (isEmpty(profile.username)) {
      alert("กรุณากรอกผู้รหัสผู้ใช้งาน");
      setCanSubmit(false);
      return;
    }

    const status = await saveDataMM(
      empID,
      profile.username.toLowerCase(),
      allApprover,
      profile.company
    );

    if (status == 200) {
      alert("SUCCESS...");
      setStateRecMM(empID);
    } else {
      alert("FAIL...");
    }
  };
  const checkUserNameReqByID = async () => {
    const user = await getProfileByID(empID);
    setStateRecMM(empID);

    setProfile(user);
    let approverNo1 = document.querySelectorAll(`.approver`)[0].innerHTML;

    if (isNotEmpty(user.username) && approverNo1 != "") {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  };

  const saveDataMM = (
    empID = "",
    username = "",
    approver = "",
    company = "KCET"
  ) => {
    return new Promise(async (resolve, reject) => {
      const res = await fetch(`${process.env.HOST}/backend/mm/saveDataMM.asp`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ empID, username, approver, company }),
      });
      const response = await res.text();

      resolve(response);
    });
  };

  const setStateRecMM = async (empID) => {
    const recMM = await getMM_Approver(empID);
    setRecMM(recMM);

    let approveID = "";
    approveID = await getUserNameApprover(recMM.approver);

    setApproveEmpID(approveID);
  };

  const getMM_Approver = (empID) => {
    return new Promise(async (resolve, reject) => {
      const res = await fetch(
        `${process.env.HOST}/backend/mm/getMM_Approver.asp`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ empID }),
        }
      );
      const response = await res.json();
      resolve(response);
    });
  };

  const getProfileByID = (empID) => {
    return new Promise(async (resolve, reject) => {
      const res = await fetch(
        `${process.env.HOST}/backend/mm/getProfileByID.asp`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ empID }),
        }
      );
      const response = await res.json();
      resolve(response);
    });
  };
  const getUserNameApprover = (approver) => {
    return new Promise(async (resolve, reject) => {
      const res = await fetch(
        `${process.env.HOST}/backend/mm/getUserNameApprover.asp`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ approver }),
        }
      );
      const response = await res.text();
      resolve(response);
    });
  };

  const getProfileApprover = async (empID, approveNo) => {
    const user = await getProfileByID(empID);

    if (isNotEmpty(user) && isNotEmpty(user.username)) {
      document.querySelectorAll(`.approver`)[
        approveNo
      ].innerHTML = user.username.toLowerCase();
      document
        .querySelectorAll(`.approver`)
        [approveNo].classList.add("text-primary");
      document
        .querySelectorAll(`.approver`)
        [approveNo].classList.remove("text-danger");
    } else {
      document.querySelectorAll(`.approver`)[approveNo].innerHTML =
        "ไม่พบข้อมูล approver";
      document
        .querySelectorAll(`.approver`)
        [approveNo].classList.add("text-danger");
      document
        .querySelectorAll(`.approver`)
        [approveNo].classList.remove("text-primary");
    }

    if (isNotEmpty(profile.username) && isNotEmpty(user.username)) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="container">
      <div className="col-8 mx-auto mt-5">
        <div className="card border-dark mb-3 px-5 py-5">
          <div className="card-body text-dark">
            <h5 className="card-title mb-5">
              MM ( Flow ) {profile.section && "แผนก : " + profile.section}{" "}
              {profile.company && profile.company}
            </h5>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">EmpID :</label>
              <div className="col-10">
                <input
                  type="text"
                  className="form-control"
                  onChange={(event) => {
                    setEmpID(event.target.value.trim());
                    setCanSubmit(false);
                  }}
                  onBlur={() => checkUserNameReqByID()}
                />
                <small className="text-primary req-info">
                  {profile.username && profile.username.toLowerCase()}
                </small>
              </div>
            </div>
            <div className="form-group row mt-3">
              <label className="col-2 col-form-label">Approver :</label>
              <div className="col-8">
                <input
                  type="text"
                  className="form-control"
                  name="approver"
                  onChange={() => {
                    setCanSubmit(false);
                  }}
                  onBlur={(event) => getProfileApprover(event.target.value, 0)}
                />
                <small className="text-primary approver"></small>
              </div>
              <div className="col-2">
                <button
                  type="button"
                  className="btn btn-dark btn-sm"
                  onClick={() => addApprover()}
                >
                  +
                </button>
              </div>
            </div>
            {eleApprover}
            <button
              type="button"
              className="btn btn-dark btn-lg btn-block col-12 mt-5"
              onClick={() => handleSubmit()}
              disabled={!canSubmit}
            >
              SUBMIT
            </button>
            <button
              type="button"
              className="btn btn-outline-danger btn-lg btn-block col-12 mt-3"
              onClick={() => resetInputApprove()}
              disabled={approverNo < 2}
            >
              CLEAR APPROVE
            </button>
          </div>
        </div>
      </div>
      <div className="card mt-5 py-3">
        <div className="card-body">
          {(isNotEmpty(recMM.empID) && (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Company</th>
                  <th scope="col">Emp ID</th>
                  <th scope="col">Username</th>
                  <th scope="col">Approver</th>
                  <th scope="col">Approver ID</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{recMM.company}</td>
                  <td>{recMM.empID}</td>
                  <td>{window.atob(recMM.username)}</td>
                  <td>{window.atob(recMM.approver)}</td>
                  <td>{approveEmpID}</td>
                </tr>
              </tbody>
            </table>
          )) || <div className="text-center"> Data is Not Found...</div>}
        </div>
      </div>
    </div>
  );
};
export default MmPage;
