import React from "react";
import {
  Button,
  Input,
  Label,
  Form,
  FormGroup,
  Spinner,
  FormFeedback,
} from "reactstrap";

export function ProjectForm({ project, saving, onSave, handleChange, errors }) {
  return (
    <Form>
      <FormGroup>
        <Label size="md" for="project-title">
          Project title:
        </Label>
        <Input
          name="title"
          type="text"
          id="project-title"
          value={project.title ? project.title : ""}
          onChange={handleChange}
          invalid={errors.onSave ? true : false}
        />
        {errors.onSave && <FormFeedback>{errors.onSave}</FormFeedback>}
      </FormGroup>
      <div className="center-button-content">
        <Button active={true} disabled={saving} onClick={onSave}>
          {saving ? "Saving..." : "Save Changes"}{" "}
          {saving ? <Spinner size="sm" color="dark" /> : null}
        </Button>
      </div>
    </Form>
  );
}
