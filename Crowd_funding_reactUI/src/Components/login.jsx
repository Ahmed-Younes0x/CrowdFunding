import { useState } from "react";
import React from "react";
import axios from "axios";

export default function Login() {
  const [logindata,Setlogindata]=useState({'email':'','password':''});
  let handelsubmit= async () => {
      const response = await axios.post('http://localhost:8000/api/gettoken',
         logindata,
              {
        headers: {
          'Content-Type': 'application/json'
        }
        
      });
      console.log(response.data['access']);
      localStorage.setItem('email',logindata['email'])
      localStorage.setItem('token', response.data['access']);
      
    
    }
  return (
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-5 col-lg-4">
            <div className="card shadow-lg border-0 rounded-3">
              <div className="card-body p-4 p-lg-5">            
                <form onSubmit={handelsubmit}>
                  <div className="mb-3">
                    <label className="form-label fw-bold text-uppercase small">Email</label>
                    <input
                      type="email"
                      className="form-control shadow-sm"
                      placeholder="Email"
                      onChange={(e)=>Setlogindata({'email':e.target.value,'password':logindata['password']})}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold text-uppercase small">Password</label>
                    <input
                      type="password"
                      className="form-control shadow-sm"
                      placeholder="Password"
                      onChange={(e)=>Setlogindata({'password':e.target.value,'email':logindata['email']})}                    />
                  </div>
                  
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="rememberMe"
                    />
                    <label className="form-check-label small fw-semibold" htmlFor="rememberMe">
                      Remember me
                    </label>
                  </div>

                  <button
                    className="btn btn-dark w-100 py-3 fw-bold text-uppercase"
                    type="button"
                    onClick={handelsubmit}
                  >
                    Sign In
                  </button>
                </form>
                
                <div className="d-flex justify-content-between mt-3">
                  <a href="#forgot" className="text-decoration-none small text-muted">
                    Forgot password?
                  </a>
                  <a href="/register" className="text-decoration-none small text-muted">
                    Create new account
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}