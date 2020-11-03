import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';

const Header = () => (
  <Navbar color="primary" className="mb-4">
    <NavbarBrand href="/">Movie List</NavbarBrand>
  </Navbar>
);

export default Header;
