import { useState } from "react";
import React from "react";
import axios from "axios";

export default function Verfiy() {
  const [logindata, Setlogindata] = useState({ email: "", token: "" });
  let handelsubmit = async () => {
    const response = await axios.post(
      "http://localhost:8000/api/verify",
      logindata,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-5 col-lg-4">
          <div className="card shadow-lg border-0 rounded-3">
            <div className="card-body p-4 p-lg-5">
              <form onSubmit={handelsubmit}>
                <div className="mb-3">
                  <label className="form-label fw-bold text-uppercase small">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control shadow-sm"
                    placeholder="Email"
                    onChange={(e) =>
                      Setlogindata({
                        email: e.target.value,
                        token: logindata["token"],
                      })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold text-uppercase small">
                    token
                  </label>
                  <input
                    type="text"
                    className="form-control shadow-sm"
                    placeholder="token"
                    onChange={(e) =>
                      Setlogindata({
                        token: e.target.value,
                        email: logindata["email"],
                      })
                    }
                  />
                </div>

                <button
                  className="btn btn-dark w-100 py-3 fw-bold text-uppercase"
                  type="button"
                  onClick={handelsubmit}
                >
                  Sign In
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
