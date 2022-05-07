import React, { useContext } from 'react'
import { MainContext } from '../Contexts/MainContext'
import { Link } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'

const NavBar = () => {

  const { isAuthenticated, setIsAuthenticated } = useContext(MainContext);

  const history = useHistory();

  const signOut = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    history.push("/SignIn");
  }

  const loginOrUser = () => {
    if (isAuthenticated) {
      return <NavDropdown title={JSON.parse(localStorage.getItem("user")).name} id="nav-dropdown">
        <NavDropdown.Item as={Link} to="/user">Profile</NavDropdown.Item>
        <NavDropdown.Item onClick={() => signOut()}>SignOut</NavDropdown.Item>
      </NavDropdown>
    } else {
      return <Nav.Link as={Link} to="/SignIn" >SignIn</Nav.Link>
    }
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="">RIDEOUT Car Rentals</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/" >Home</Nav.Link>
          <Nav.Link as={Link} to="/create" >Vehicles</Nav.Link>
          <Nav.Link as={Link} to="/booking" >Booking</Nav.Link>
          <Nav.Link as={Link} to="/payment" >Payment</Nav.Link>
          <Nav.Link as={Link} to="/driverdetail" >Driver</Nav.Link>
          <Nav.Link as={Link} to="/supplierList" >Supplier</Nav.Link>
          <Nav.Link as={Link} to="/about" >About Us</Nav.Link>
          {loginOrUser()}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;