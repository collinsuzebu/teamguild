import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";

export default function ProjectModal({
  isOpen,
  toggle,
  onSave,
  errors,
  handleChange,
  className,
}) {
  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Create a new project</ModalHeader>
        <ModalBody>
          <Input
            id="md-project-title"
            type="text"
            name="title"
            onChange={handleChange}
            placeholder="Enter project title..."
            invalid={errors.onSave ? true : false}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onSave}>
            Create
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
