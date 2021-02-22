import React from "react";
import { useHistory } from "react-router-dom";
import "./ProjectList.scss";

export function ProjectList({ projects, showAll }) {
  let history = useHistory();

  let display =
    showAll || projects.length === 0 ? projects : projects.slice(0, 5);

  const buffer = display.map((project) => (
    <div
      key={project._id}
      className="project-icon"
      onClick={() => history.push(`/projects/${project._id}`)}
    >
      <div className="project-name">{project.title}</div>
      <div className="project-info-button">Edit project</div>
    </div>
  ));

  return (
    <>
      <div className="header">
        {showAll ? "All projects" : "Recent Projects"}
      </div>
      <div className="projects-wrapper">{buffer}</div>
    </>
  );
}
