import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const DeleteModal = ({ project, modal, toggle, deleteProject }) => {
  return (
    <div>
      <Modal isOpen={modal} fade={false} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          {`Delete project "${project.title}"`}
        </ModalHeader>
        <ModalBody>This action cannot be undone.</ModalBody>

        <ModalFooter>
          <Button color="danger" onClick={deleteProject}>
            Delete
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export { DeleteModal };
