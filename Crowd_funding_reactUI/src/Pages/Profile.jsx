import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [projects, setProjects] = useState([]);
  const [donations, setdonations] = useState([]);
  const [editing, setEditing] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // get user data
    axios
      .post(
        `http://localhost:8000/api/users`,
        { email: localStorage.getItem("email") },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        setProfile(res.data);
      });
    // get projects
    axios
      .get(`http://localhost:8000/api/projects/user/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setProjects(res.data));

    // get dontaions
    axios
      .post(
        `http://localhost:8000/api/donations/`,
        { email: localStorage.getItem("email") },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        setdonations(res.data);
        console.log(res.data);
      });
  }, []);
  const handleDeleteProject = async (project_id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete your project?"
    );
    if (confirm) {
      await axios.post(
        "http://localhost:8000/api/project/delete",
        { 'projectId':project_id, 'email':localStorage.getItem('email') },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  };
  const handleDelete = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (confirm) {
      await axios.post(
        "http://localhost:8000/api/user/delete",
        { 'password':password, 'email':localStorage.getItem('email') },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  };

  const handleUpdate = async () => {
    await axios.put("/api/user/update", profile, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setEditing(false);
  };

  return (
    <div>
      <h1 className="mb-4">My Profile</h1>

      <div className="card mb-4">
        <div className="card-body">
          {editing ? (
            <>
              <input
                className="form-control mb-2"
                value={profile.username}
                onChange={(e) =>
                  setProfile({ ...profile, username: e.target.value })
                }
              />
              <input
                className="form-control mb-2"
                value={profile.birthdate}
                onChange={(e) =>
                  setProfile({ ...profile, birthdate: e.target.value })
                }
                placeholder="Birthdate"
              />
              <input
                className="form-control mb-2"
                value={profile.country}
                onChange={(e) =>
                  setProfile({ ...profile, country: e.target.value })
                }
                placeholder="Country"
              />
              <button className="btn btn-primary" onClick={handleUpdate}>
                Save
              </button>
            </>
          ) : (
            <>
              <p>
                <strong>Username:</strong> {profile.username}
              </p>
              <p>
                <strong>Email:</strong> {profile.email}
              </p>
              <p>
                <strong>phone:</strong> {profile.phone || "N/A"}
              </p>
              <p>
                <strong>profile picture:</strong> {profile.image || "N/A"}
              </p>
              <button
                className="btn btn-secondary"
                onClick={() => setEditing(true)}
              >
                Edit
              </button>
            </>
          )}
        </div>
      </div>

      <h2>My Projects</h2>
      <table className="table table-striped-columns w-75 my-3">
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>current Amount</th>
            <th>Total target</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody className=" w-75">
          {projects.map((p) => (
            <tr key={p.id}>
              <td>{p.title}</td>
              <td>{p.current_amount}</td>
              <td>{p.total_target}</td>
              <td><button className="btn btn-danger mx-auto" onClick={() => handleDeleteProject(p.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>My Donations</h2>
      <table className="table table-striped w-75 my-3">
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>Donation Amount</th>
            <th>Project ID</th>
          </tr>
        </thead>
        <tbody className=" w-75">
          {donations.map((d) => (
            <tr key={d.id}>
              <td>{d.title}</td>
              <td>${d.amount}</td>
              <td>{d.project}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="card p-3 w-50">
        <h4>Delete Account</h4>
        <input
          type="password"
          className="form-control mb-2"
          placeholder="Enter password to confirm"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Profile;
