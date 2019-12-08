import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import "../App.css";

const TopNavBar = () => {
  return (
    <div className="top-navbar">
      <Navbar>
        <NavbarBrand href="/">Nextagram</NavbarBrand>

        <Nav>
          <NavItem>
            <NavLink href="/users/2">My Profile</NavLink>
          </NavItem>

          <NavItem>
            <NavLink href="/login">Login</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
};
export default TopNavBar;

// const TopNavBar = () => {
//   return (
//     <div>
//       <Navbar bg="dark" variant="dark">
//         <Navbar.Brand href="/">Nextagram</Navbar.Brand>
//         <Nav className="mr-auto">
//           <Nav.Link href="/users/2">My Profile</Nav.Link>
//           <Nav.Link href="/login">Login</Nav.Link>
//         </Nav>
//         <Form inline>
//           <FormControl type="text" placeholder="Search" className="mr-sm-2" />
//           <Button variant="outline-info">Search</Button>
//         </Form>
//       </Navbar>
//     </div>
//   );
// };

// export default TopNavBar;
