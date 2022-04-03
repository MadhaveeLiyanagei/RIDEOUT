import React from 'react'
import { Link } from 'react-router-dom'
import {Navbar,Nav,Container } from 'react-bootstrap'

const NavBar = () => {
    return (
        <Navbar bg="dark" variant="dark">
        <Container>
            <Navbar.Brand href="">RIDEOUT Car Rentals</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link as={Link} to="/" >Home</Nav.Link>
                <Nav.Link as={Link} to="/create" >Vehicles</Nav.Link>
                <Nav.Link as={Link} to="/booking" >Booking</Nav.Link>
                <Nav.Link as={Link} to="/payment" >Payment</Nav.Link>
                <Nav.Link as={Link} to="/user" >User</Nav.Link>
                <Nav.Link as={Link} to="/adddriver" >Driver</Nav.Link>
                <Nav.Link as={Link} to="/about" >About Us</Nav.Link>
            </Nav>
        </Container>
      </Navbar>
    );
  }
   
  export default NavBar;