import React from "react";
import Enzyme from "enzyme";
import { TopNav } from "./TopNav";

describe("NavItems", () => {
  it("should contains 3 NavItem(s)", () => {
    const navItems = Enzyme.shallow(<TopNav />).find("NavItem").length;
    expect(navItems).toEqual(3);
  });
});
