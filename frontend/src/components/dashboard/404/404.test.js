import NotFound from "./404";

describe("404", () => {
  it("Renders page not found", () => {
    const wrapper = shallow(<NotFound />);
    const body = <p>The requested page was not found on our server.</p>;
    expect(wrapper.contains(body)).toEqual(true);
  });
});
