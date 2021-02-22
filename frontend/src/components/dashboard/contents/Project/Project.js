import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container } from "reactstrap";
import { saveProject, loadProjects } from "../../../../redux/actions/project";
import DSpinner from "../../common/Spinner";
import { isValidInput } from "../../utils/validation";
import { ProjectList } from "./ProjectList";
import ProjectModal from "./ProjectModal";

export function Project() {
  const [modal, setModal] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [project, setProject] = useState({ title: "" });
  const [errors, setErrors] = useState({});
  const projects = useSelector((state) => state.projects);
  const loading = useSelector((state) => state.apiCallInProgress > 0);

  const dispatch = useDispatch();

  const toggleModal = () => setModal(!modal);

  useEffect(() => {
    //   only fetch new data from server if current state is empty
    if (projects.length === 0) {
      dispatch(loadProjects()).catch((error) => {
        console.log("Failed to load projects " + String(error));
      });
    }
  }, []);

  function handleChange(e) {
    if (errors.onSave) {
      setErrors({ onSave: "" });
    }
    const proj = { ...project, [e.target.name]: e.target.value };
    setProject(proj);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!isValidInput(project)) {
      setErrors({ onSave: "project title cannot be empty" });
      return;
    }

    dispatch(saveProject(project)).then(() => {
      toggleModal();
    });
  }

  const showAllProject = () => {
    if (showAll) {
      dispatch(loadProjects());
    }
    setShowAll(!showAll);
  };

  let buttonContent;

  if (projects.length > 0) {
    buttonContent = (
      <>
        <Button color="primary" size="sm" onClick={toggleModal}>
          Create a new project
        </Button>
        <Button
          color="secondary"
          size="sm"
          className="float-right"
          onClick={showAllProject}
        >
          {!showAll ? "Show all projects" : "View recent projects"}
        </Button>
        <ProjectModal
          isOpen={modal}
          handleChange={handleChange}
          onSave={handleSubmit}
          errors={errors}
          toggle={toggleModal}
          className=""
        />
      </>
    );
  } else {
    buttonContent = (
      <div className="center-button-content">
        <div className="sub-header">You have no projects</div>
        <Button color="primary" size="md" onClick={toggleModal}>
          Create a new project
        </Button>
        <ProjectModal
          isOpen={modal}
          handleChange={handleChange}
          onSave={handleSubmit}
          toggle={toggleModal}
          errors={errors}
          className=""
        />
      </div>
    );
  }

  if (loading) {
    return <DSpinner />;
  }

  return (
    <Container fluid="md">
      {buttonContent}
      {loading ? <DSpinner /> : ProjectList({ projects, showAll })}
    </Container>
  );
}
