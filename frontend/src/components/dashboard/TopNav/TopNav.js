import React, { useState } from "react";
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../redux/actions/auth";

import "./TopNav.scss";

const TopNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const history = useHistory();

  const toggle = () => setIsOpen(!isOpen);

  const logout = () => {
    dispatch(logoutUser(history));
  };

  return (
    <div>
      <Navbar light expand="md" className="mb-5 top-nav">
        <Container>
          <NavbarBrand tag={Link} className="brand-header" to="/dashboard">
            {/* <Link to="/dashboard" className="nav-top-item"> */}
            ProjectManager<span className="brand-header-sub"></span>
            {/* </Link> */}
          </NavbarBrand>

          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link to="#" className="nav-top-item">
                  <span className="navbar-text mr-3">
                    {user ? `Signed in as ${user.name}` : null}
                  </span>
                </Link>
              </NavItem>

              <NavLink href="#">
                <NavItem className="nav-top-item">profile</NavItem>
              </NavLink>

              <NavLink href="#" className="nav-top-item" onClick={logout}>
                <NavItem className="nav-top-item">logout</NavItem>
              </NavLink>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export { TopNav };
