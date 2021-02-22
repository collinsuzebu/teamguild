import React from "react";
import Enzyme from "enzyme";
import { ProjectForm } from "./ProjectForm";

describe("<ProjectForm />", () => {
  let wrapper;
  const props = {
    projects: [],
    saving: false,
    onSave: jest.fn(),
    handleChange: jest.fn(),
    errors: {},
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Renders form", () => {
    it("should render a single form", () => {
      const wrapper = Enzyme.shallow(<ProjectForm {...props} />);
      expect(wrapper.find("form").length).toBe(1);
    });
  });

  describe("Title input", () => {
    it("should change input on handleChange", () => {
      const wrapper = Enzyme.shallow(<ProjectForm {...props} />);

      let sample = "sample title";
      const title = wrapper.find("input").at(0);

      title.instance().value = sample;
      title.simulate("change");
      expect(props.handleChange).toHaveBeenCalledWith(sample);
    });
  });

  describe("Button Label", () => {
    it("should label save buttons as 'Save Changes' when not saving", () => {
      const wrapper = Enzyme.shallow(<ProjectForm {...props} />);
      expect(wrapper.find("button").text()).toBe("Save Changes");
    });

    it("should label save buttons as 'Saving...' when saving", () => {
      const new_props = { ...props, saving: true };
      const wrapper = Enzyme.shallow(<ProjectForm {...new_props} />);
      expect(wrapper.find("button").text()).toBe("Saving...");
    });
  });
});
