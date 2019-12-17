import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import "../App.css";

class NavBar extends React.Component {
  onDismiss = () => {
    this.props.clearError(false);
  };

  render() {
    return (
      <div className="top-navbar">
        <Navbar>
          <NavbarBrand href="/">Nextagram</NavbarBrand>

          <Nav>
            {localStorage.getItem("authToken") ? (
              <>
                <NavItem>
                  <NavLink href="/profile">My Profile</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/uploadpage">Upload</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick={this.props.handleLogout} href="/">
                    Logout
                  </NavLink>
                </NavItem>
              </>
            ) : (
              <NavItem>
                <NavLink href="/login">Login</NavLink>
              </NavItem>
            )}
          </Nav>
        </Navbar>
      </div>
    );
  }
}
export default NavBar;
