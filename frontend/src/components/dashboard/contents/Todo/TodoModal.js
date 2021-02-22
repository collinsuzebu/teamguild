import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Form, FormGroup, Label, Input } from "reactstrap";

const TodoModal = ({
  project,
  todo,
  toggle,
  modal,
  edit,
  errors,
  onSave,
  handleChange,
}) => {
  return (
    <div>
      <Modal isOpen={modal} fade={false} toggle={toggle}>
        <ModalHeader toggle={toggle}>{`${edit ? "Edit" : "Add"} Todo for "${
          project.title
        }"`}</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="todo-title">Title</Label>
              <Input
                type="text"
                value={todo.title || ""}
                name="title"
                id="todo-title"
                onChange={handleChange}
                invalid={errors.todoSave ? true : false}
              />
            </FormGroup>

            <FormGroup>
              <Label for="todo-desc">Description</Label>
              <Input
                type="textarea"
                value={todo.description || ""}
                name="description"
                id="todo-desc"
                onChange={handleChange}
                invalid={errors.todoSave ? true : false}
              />
            </FormGroup>

            <FormGroup check>
              <Label check>
                <Input
                  name="status"
                  type="checkbox"
                  disabled={!edit}
                  onChange={handleChange}
                  checked={todo.status === "completed"}
                />
                Mark as complete
              </Label>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              onSave();
              toggle();
            }}
          >
            {edit ? "Edit Todo" : "Add Todo"}
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default TodoModal;
