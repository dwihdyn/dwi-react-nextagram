import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import "../App.css";

const NavBar = props => {
  return (
    <div className="top-navbar">
      <Navbar>
        <NavbarBrand href="/">Nextagram</NavbarBrand>

        <Nav>
          <NavItem>
            <NavLink href="/users/2">My Profile</NavLink>
          </NavItem>

          <NavItem>
            {localStorage.getItem("authToken") ? (
              <NavLink onClick={props.handleLogout} href="/">
                Logout
              </NavLink>
            ) : (
              <NavLink href="/login">Login</NavLink>
            )}
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
};
export default NavBar;
