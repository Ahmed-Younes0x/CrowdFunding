import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ProgressBar } from "react-bootstrap";

export default function ProjectDetailPage() {
const { id } = useParams();
  const [project, setProject] = useState(null);
  const [comments, setComments] = useState([]);
   const [amount, setAmount] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  
  let projectId=localStorage.getItem('projectId')
  useEffect(() => {
    axios.get(`http://localhost:8000/api/projects/${id}`).then((res) => {
      setProject(res.data);
    });
    axios.get(`http://localhost:8000/api/projects/${projectId}/comments`).then((res) => {
      setComments(res.data);
    });
  }, [projectId]);

  if (!project) return <div>Loading...</div>;

  const progress = Math.min((project.current_amount / project.total_target) * 100, 100).toFixed(2);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      email: localStorage.getItem('email'),
      amount: amount,
      id: id,
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
    <div className="container mt-5">
      <h2 className="mb-3">{project.title}</h2>

      <div className="mb-4">
        <img
          src={project.image || "/default_project.jpg"}
          alt={project.title}
          className="img-fluid rounded shadow-sm"
          style={{ maxHeight: "400px", objectFit: "cover", width: "100%" }}
        />
      </div>

      <p className="lead">{project.details}</p>

      <div className="mb-4">
        <h5>Funding Progress</h5>
        <ProgressBar
          now={progress}
          label={`${progress}%`}
          className="mb-2"
          striped
          variant="success"
        />
        <p>
          ${project.current_amount} raised of ${project.total_target} goal (
          {progress}%)
        </p>
        <p>{project.days_left} days left</p>
      </div>

      <div className="mb-4">
        <h5>Rating</h5>
        <p>
          ⭐ {project.average_rating.toFixed(1)} / 5 from {project.total_ratings_count} ratings
        </p>
      </div>

      <div>
        <h5>Comments</h5>
        {comments.length > 0 ? (
          <ul className="list-group">
            {comments.map((comment) => (
              <li className="list-group-item" key={comment.id}>
                <strong>{comment.user}:</strong> {comment.text}
              </li>
            ))}
          </ul>
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
      <div className="container-fluid w-100">
      <h2 className="mb-4">Make a Donation</h2>

      <form onSubmit={handleSubmit}>
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
          className="alert alert-success mt-4"
          role="alert"
        >
          <i className="bi bi-check-circle-fill me-2"></i>
          Donation successful!
        </div>
      )}
    </div>
    </div>
  );
}
