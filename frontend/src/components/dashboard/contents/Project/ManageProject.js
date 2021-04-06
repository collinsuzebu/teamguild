import React, { useState, useEffect } from "react";
import {
  Button,
  ButtonGroup,
  Row,
  Container,
  Col,
  Spinner,
  Tooltip,
} from "reactstrap";
import { TopNav } from "../../TopNav/TopNav";
import { ProjectForm } from "./ProjectForm";
import { toast } from "react-toastify";
import "./ManageProject.scss";
import {
  loadProjects,
  saveProject,
  deleteProject,
  exportProject,
} from "../../../../redux/actions/project";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DSpinner from "../../common/Spinner";
import { isValidInput } from "../../utils/validation";
import { DeleteModal } from "./ProjectDeleteModal";
import TodoModal from "../Todo/TodoModal";
import { TodoList } from "../Todo/TodoList";
import {
  loadTodos,
  saveTodo,
  deleteTodo,
} from "../../../../redux/actions/todo";
import { CopyToClipboard } from "react-copy-to-clipboard";

export function ManageProject() {
  // set up default
  const [project, setProject] = useState({});
  const [todo, setTodo] = useState({ title: "", description: "" });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [editTodo, setEditTodo] = useState(false);
  const [gistLink, setGistLink] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [modal, setModal] = useState({
    deleteProject: false,
    addTodo: false,
  });

  // set redux dispatch action hook
  const dispatch = useDispatch();

  // select states from store
  const projects = useSelector((state) => state.projects);
  const exportedProj = useSelector((state) => state.projectExported);
  const todos = useSelector((state) =>
    Object.keys(state.todos).length > 0 ? state.todos[project._id] : []
  );

  // use react-router dom history for redirect
  const history = useHistory();

  // get id parameter of current url
  const { id } = useParams();

  // if this is a valid existing project populate fields
  if (id && Object.keys(project).length === 0) {
    let proj = getProjectById(projects, id);
    proj && setProject(proj);
  }

  // set toggle functions
  const toggleEditModal = (id) => {
    var currentOpenTodo = getTodoById(todos, id);

    if (currentOpenTodo) {
      setTodo(currentOpenTodo);
    } else {
      setTodo({ title: "", description: "" });
    }
    setEditTodo(!editTodo);
  };

  const toggleProjectDeleteModal = () =>
    setModal({ ...modal, deleteProject: !modal.deleteProject });

  const toggleAddModal = () => {
    // setEditTodo(false);
    setModal({ ...modal, addTodo: !modal.addTodo });
  };

  const toggleToolTip = () => setTooltipOpen(!tooltipOpen);

  // useEffect to pull data from api and save to store
  useEffect(() => {
    //   only fetch new data from server if current state is empty
    if (projects.length === 0) {
      dispatch(loadProjects()).catch((error) => {
        console.log("Failed to load projects " + String(error));
      });
    }
  }, [project]);

  useEffect(() => {
    if (project._id) {
      dispatch(loadTodos(project._id)).catch((error) => {
        console.log("Failed to load projects " + String(error));
      });
    }
  }, []);

  useEffect(() => {
    if (exportedProj) {
      setGistLink(exportedProj);
    }
  }, [exportedProj]);

  const onExport = (e) => {
    setExporting(true);
    dispatch(exportProject(project._id)).then(() => {
      toast.success("Project exported as github gist.");
      setExporting(false);
    });
  };

  // save project to server and put in redux store
  const onSave = (e) => {
    setSaving(true);
    if (!isValidInput(project)) {
      setSaving(false);
      setErrors({ onSave: "project title cannot be empty" });
      return;
    }

    dispatch(saveProject(project))
      .then(() => {
        toast("Project Saved.");
        history.push("/dashboard");
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  };

  // handle changes to project form input
  const onChange = (e) => {
    e.preventDefault();
    if (errors.onSave) {
      setErrors({ onSave: "" });
    }
    const { name, value } = e.target;
    setProject((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // delete a todo
  const handleDeleteTodo = async (todo) => {
    try {
      dispatch(deleteTodo(project._id, todo)).then(() => {
        toast("Todo deleted");
      });
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };

  // delete a project
  const handleDeleteProject = async (e) => {
    try {
      dispatch(deleteProject(project));
      toast("Project Deleted.");
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
    history.push("/dashboard");
  };

  // update a todo // add a todo
  const handleSaveTodo = async () => {
    if (!isValidInput(todo)) {
      setErrors({ todoSave: "field cannot be empty" });
      return;
    }
    try {
      dispatch(saveTodo(project._id, todo));

      if (!todo._id) {
        setTodo({ title: "", description: "" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // monitor changes made to todo form
  const handleTodoChange = (e) => {
    setErrors({ todoSave: "" });

    const { name, value } = e.target;
    setTodo((prevState) => ({
      ...prevState,
      [name]:
        name === "status"
          ? e.target.checked === true
            ? "completed"
            : "pending"
          : value,
    }));
  };

  return (
    <>
      <TopNav />
      <Container fluid="md">
        {projects.length === 0 ? (
          <DSpinner />
        ) : (
          <>
            <Row>
              <Col>
                <h2 style={{ marginBottom: "30px" }}>Edit Project</h2>
              </Col>
              <Col>
                <ButtonGroup className="mb-2 mt-2 float-right">
                  <CopyToClipboard
                    text={gistLink}
                    onCopy={() => {
                      toast("Copied");
                    }}
                  >
                    <Button disabled={gistLink ? false : true}>
                      <i id="tooltipId_1" className="fa fa-copy fa-xs"></i>
                    </Button>
                  </CopyToClipboard>

                  <Button size="sm" color={"primary"} onClick={toggleAddModal}>
                    Add Task
                  </Button>
                  <Button
                    size="sm"
                    disabled={exporting}
                    onClick={() => onExport()}
                  >
                    {exporting ? "Exporting " : "Export Project"}{" "}
                    {exporting ? <Spinner size="sm" color="dark" /> : null}
                  </Button>
                  <Button
                    color={"danger"}
                    size="sm"
                    onClick={toggleProjectDeleteModal}
                  >
                    Delete Project
                  </Button>
                  <DeleteModal
                    project={project}
                    toggle={toggleProjectDeleteModal}
                    modal={modal.deleteProject}
                    deleteProject={handleDeleteProject}
                  />
                  <TodoModal
                    todo={todo}
                    project={project}
                    toggle={editTodo ? toggleEditModal : toggleAddModal}
                    modal={modal.addTodo || editTodo}
                    onSave={handleSaveTodo}
                    edit={editTodo}
                    errors={errors}
                    handleChange={handleTodoChange}
                  />
                </ButtonGroup>
              </Col>
            </Row>
            <Tooltip
              placement="top"
              isOpen={tooltipOpen}
              target="tooltipId_1"
              toggle={toggleToolTip}
            >
              Copy link to recently exported gist.
            </Tooltip>
            <ProjectForm
              project={project}
              onSave={onSave}
              saving={saving}
              errors={errors}
              handleChange={onChange}
            />
          </>
        )}

        {todos && (
          <TodoList
            todos={todos}
            onDelete={handleDeleteTodo}
            edit={toggleEditModal}
          />
        )}
      </Container>
    </>
  );
}

// project store selector
const getProjectById = (projects, id) => {
  return projects.find((project) => project._id === id) || null;
};

const getTodoById = (todos, id) => {
  return todos.find((todo) => todo._id == id) || null;
};
