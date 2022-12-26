import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Bag, BagFill, DatabaseFillUp, DoorClosedFill, GearFill, Person, PersonAdd, PersonCircle, PersonFill, ShopWindow, Trash2Fill, Upload} from 'react-bootstrap-icons';
import { Navigate, useNavigate } from 'react-router-dom';
import { remCustomerToken } from '../services/TokenServices';

function ShopNavigationBar() {

  const navigate = useNavigate()
  const CustomerLogOut = () => {
    remCustomerToken()
    navigate('/')
    
  }

  return (
    <div><Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="/">{<ShopWindow color='white' size={30} />} SHOPPING</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#features" id="navbarScrollingDropdown">Features</Nav.Link>
          <Nav.Link href="#pricing" id="navbarScrollingDropdown">Pricing</Nav.Link>
         
            
        </Nav>
        <Nav>
        <NavDropdown title={<PersonFill color='white' size={45}  />}  id="navbarScrollingDropdown">
            <NavDropdown.Item href="/shop/customers/update-profile" ><PersonCircle  color='black' size={25} /> PROFILE</NavDropdown.Item>
            <NavDropdown.Item onClick={CustomerLogOut} ><DoorClosedFill  color='black' size={25} />
                    LOGOUT
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3" >Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4" >
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
         
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar></div>
  )
}

export default ShopNavigationBar