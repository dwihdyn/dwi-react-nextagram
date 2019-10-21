import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar">
      <Link to="/"> Home </Link>
      <Link to="/users/2"> My Profile </Link>
    </nav>
  );
};
export default NavBar;
