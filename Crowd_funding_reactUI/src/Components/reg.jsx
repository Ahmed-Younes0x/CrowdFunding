import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

function Register() {
  const navigate = useNavigate();
  const [fields, setFields] = useState(["", "", "", "", "",""]);
  const [valid, setValid] = useState([false, false, false, false, false,false]);
  const [fieldstate, setfieldstate] = useState(["", "", "", "", "",""]);
  function keypressed(id, char) {
    let newfields = fields;
    newfields[id] = char;
    setFields(newfields);
    validate(id);
  }
  let handelsubmit = async () => {
    if (valid.some(v => v==false)) {alert('error please revise the form');
      return}

    try {
      let response = await axios.post(
        "http://localhost:8000/register",
        {
          name: fields[0],
          email: fields[1],
          password: fields[3],
          username: fields[2],
          phone: fields[5]
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("success");
    } catch (error) { 
      if (`${error}`.includes('406')){alert(`email already used`)}
      else {alert(`error ${error}`);
}
    }
  };

  function validate(id) {
    let newvalid = valid;
    let newfieldstate = fieldstate;
    console.log("verify", id);
    switch (id) {
      case 0:
        newvalid[id] = fields[id] !== "";
        newfieldstate[id] = newvalid[id] ? "" : " bg-danger opacity-50 ";
        break;
      case 1:
        newvalid[id] = fields[id].match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
          ? true
          : false;
        newfieldstate[id] = newvalid[id] ? "" : " bg-danger opacity-50 ";
        break;
      case 2:
        console.log("user");
        newvalid[id] = fields[id].match(/^\S+$/) ? true : false;
        newfieldstate[id] = newvalid[id] ? "" : " bg-danger opacity-50 ";
        console.log(newvalid[id]);
        break;

      case 3:
        console.log("pass");
        newvalid[id] = fields[id].match(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@%$#*])[A-Za-z\d@%$#*]{8,}$/
        )
          ? true
          : false;
        newfieldstate[id] = newvalid[id] ? "" : " bg-danger opacity-50 ";
        console.log(newvalid[id]);
        break;

      case 4:
        newvalid[id] = fields[id] == fields[id - 1];
        newfieldstate[id] = newvalid[id] ? "" : " bg-danger opacity-50 ";
        console.log(newvalid[id]);
        break;
      case 5:
        newvalid[id] = fields[id].match(
          /^01[1,2,0,5][0-9]{8}$/);
        newfieldstate[id] = newvalid[id] ? "" : " bg-danger opacity-50 ";
        break;

      default:
        break;
    }
    setValid(newvalid);
    setfieldstate(newfieldstate);
  }
  function sendinfo() {
    if (valid.some((e) => e == false)) navigate("/");
  }
  return (
    <>
      <div className="input-group d-flex flex-column mb-3">
        <div>
          {" "}
          <span
            className={"input-group-text" + fieldstate[0]}
            id="inputGroup-sizing-default"
          >
            Name
          </span>
          <input
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            onChange={(e) => keypressed(0, e.target.value)}
          />
        </div>

        <div>
          {" "}
          <span
            className={"input-group-text" + fieldstate[1]}
            id="inputGroup-sizing-default"
          >
            Email
          </span>
          <input
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            onChange={(e) => keypressed(1, e.target.value)}
          />
        </div>

        <div>
          {" "}
          <span
            className={"input-group-text" + fieldstate[2]}
            id="inputGroup-sizing-default"
          >
            Username
          </span>
          <input
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            onChange={(e) => keypressed(2, e.target.value)}
          />
        </div>
        <div>
          {" "}
          <span
            className={"input-group-text" + fieldstate[2]}
            id="inputGroup-sizing-default"
          >
            Phone number
          </span>
          <input
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            onChange={(e) => keypressed(5, e.target.value)}
          />
        </div>

        <div classname=" input-group mb-3">
          <span
            className={"input-group-text" + fieldstate[3]}
            id="inputGroup-sizing-default"
          >
            Password
          </span>
          <input
            type="password"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            onChange={(e) => keypressed(3, e.target.value)}
          />
        </div>
        <div>
          <span
            className={"input-group-text" + fieldstate[4]}
            id="inputGroup-sizing-default"
          >
            Confirm Password
          </span>
          <input
            type="password"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            onChange={(e) => keypressed(4, e.target.value)}
          />
        </div>

        <button className="btn btn-success" onClick={handelsubmit}>
          Register
        </button>
      </div>
    </>
  );
}

export default Register;
