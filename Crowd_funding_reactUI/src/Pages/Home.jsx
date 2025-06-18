import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
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

        const projectList = projectRes.data;

        // Fetch images for each project
        const projectsWithImages = await Promise.all(
          projectList.map(async (project) => {
            try {
              const imgRes = await axios.get(
                `http://localhost:8000/api/images/${project.id}`,
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              );
              return { ...project, images: imgRes.data };
            } catch (err) {
              console.error(
                "Error fetching images for project",
                project.id,
                err
              );
              return { ...project, images: [] };
            }
          })
        );

        setProjects(projectsWithImages);
      } catch (err) {
        console.error("Error fetching projects", err);
      }
    };

    fetchProjectsWithImages();
  }, []);

  return (
    <div>
      <h1 className="mb-4 text-center mx-5">Welcome to Django_CrowdFund</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet ab
        officia reiciendis, quibusdam exercitationem officiis et non
        voluptatibus tempore deleniti doloremque corrupti distinctio illo sequi.
        Amet itaque libero unde veniam!
      </p>
      <div className="mb-4">
        <h3>Latest Projects</h3>
        <div className="row">
          {projects.slice(0, 5).map((p) => (
            <div className="col-md-4 mb-3" key={p.id}>
              <div
                className="card h-100 shadow-sm"
              >
                {p.images && p.images.length > 0 && (
                  <div
                    id={`carousel-${p.id}`}
                    className="carousel slide"
                    data-bs-ride="carousel"
                  >
                    <div className="carousel-inner">
                      {p.images.map((img, index) => (
                        <div
                          className={`carousel-item ${
                            index === 0 ? "active" : ""
                          }`}
                          key={img.id || index}
                        >
                          <img
                            src={img.image}
                            className="d-block w-100"
                            alt={`Project ${p.title}`}
                            style={{ objectFit: "cover", height: "200px" }}
                          />
                        </div>
                      ))}
                    </div>
                    {p.images.length > 1 && (
                      <>
                        <button
                          className="carousel-control-prev"
                          type="button"
                          data-bs-target={`#carousel-${p.id}`}
                          data-bs-slide="prev"
                        >
                          <span
                            className="carousel-control-prev-icon"
                            aria-hidden="true"
                          ></span>
                          <span className="visually-hidden">Previous</span>
                        </button>
                        <button
                          className="carousel-control-next"
                          type="button"
                          data-bs-target={`#carousel-${p.id}`}
                          data-bs-slide="next"
                        >
                          <span
                            className="carousel-control-next-icon"
                            aria-hidden="true"
                          ></span>
                          <span className="visually-hidden">Next</span>
                        </button>
                      </>
                    )}
                  </div>
                )}
                <div className="card-body">
                  <h5 className="card-title">{p.title}</h5>
                  <p className="card-text">{p.details?.slice(0, 100)}...</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
