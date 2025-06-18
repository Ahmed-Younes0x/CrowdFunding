import React, { useState, useEffect } from "react";
import axios from "axios";

export default function DonationPage() {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [amount, setAmount] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/projects/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setProjects(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      email: localStorage.getItem('email'),
      amount: amount,
      id: selectedProjectId,
    };

    try {
      const response = await axios.post(`http://localhost:8000/api/donations/create`, payload);
      if (response.status === 200) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
        setAmount("");
        setSelectedProjectId("");
      }
    } catch (error) {
      console.error("Donation failed:", error);
    }
  };

  return (
    <div className="container mt-5 w-50">
      <h2 className="mb-4">Make a Donation</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Select Project</label>
          <select
            className="form-select"
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            required
          >
            <option value="">-- Choose a project --</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.title}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Donation Amount</label>
          <input
            type="number"
            className="form-control"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min="1"
          />
        </div>

        <button type="submit" className="btn btn-success">
          Donate
        </button>
      </form>
      {showSuccess && (
        <div
          className="alert alert-success mt-4 d-flex align-items-center"
          role="alert"
        >
          <i className="bi bi-check-circle-fill me-2"></i>
          Donation successful!
        </div>
      )}
    </div>
  );
}
