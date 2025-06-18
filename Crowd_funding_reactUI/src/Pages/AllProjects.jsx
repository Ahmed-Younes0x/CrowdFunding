import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllProjects = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjectsWithImages = async () => {
      try {
        const projectRes = await axios.get(
          "http://localhost:8000/api/projects/",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setProjects(projectRes.data)

      } catch (err) {
        console.error("Error fetching projects", err);
      }
    };

    fetchProjectsWithImages();
  }, []);

  return (
    <div className="container mt-4">
  <div className="row">
    {projects.map((p) => (
      <div className="col-md-4 mb-4" key={p.id}>
        <div className="card h-100 shadow-sm">
          <img
            src={p.image || "/default_project.jpg"}
            className="card-img-top"
            alt={p.title}
            style={{ height: "200px", objectFit: "cover" }}
          />
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">{p.title}</h5>
            <p className="card-text text-truncate">{p.details}</p>

            <div className="mt-auto">
              <div className="mb-2">
                <div className="progress">
                  <div
                    className="progress-bar bg-success"
                    role="progressbar"
                    style={{
                      width: `${(p.current_amount / p.total_target) * 100}%`,
                    }}
                  >
                    {Math.round((p.current_amount / p.total_target) * 100)}%
                  </div>
                </div>
                <small className="text-muted">
                  ${p.current_amount} raised of ${p.total_target}
                </small>
              </div>

              <p className="mb-1">
                ⭐ {p.average_rating?.toFixed(1) || "0.0"} from{" "}
                {p.total_ratings_count} ratings
              </p>

              <a href={`/project/${p.id}`} className="btn btn-primary w-100">
                View Project
              </a>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default AllProjects;
