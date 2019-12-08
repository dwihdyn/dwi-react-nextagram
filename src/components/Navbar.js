import React from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledAlert
} from "reactstrap";
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
            {this.props.loggedIn ? (
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
        {this.props.errorMessage ? (
          <UncontrolledAlert color="danger" toggle={this.onDismiss}>
            Invalid credential. Please check your username/password{" "}
          </UncontrolledAlert>
        ) : null}
      </div>
    );
  }
}
export default NavBar;
