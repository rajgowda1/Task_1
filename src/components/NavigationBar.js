import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';

import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';  

import { DatabaseFillUp, GearFill, ListStars, PersonAdd, SignDeadEnd, Trash2Fill, Upload ,Gear ,EnvelopeCheck} from 'react-bootstrap-icons';
import SendVerifyEmail from './AuthSettings/SendVerifyEmail';
const { Link } = require("react-router-dom");



const NavigationBar = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (


<>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Send Verification Email </Modal.Title>
        </Modal.Header>
        <Modal.Body> <SendVerifyEmail /></Modal.Body>
        
      </Modal>

    <nav style={{ textAlign: "center", marginTop: "20px" }}>
      <Navbar bg="dark" variant="dark"  fixed="top" >
        <Container>
        
          
        
          <Navbar.Brand href="#home" id="textLogo" >LOGO </Navbar.Brand>
          <Nav className="justify-content-end">
            <Nav.Link href= "/my-profile" id="navbarScrollingDropdown">🏠 Home</Nav.Link>

            <Nav.Link href= "/products" id="navbarScrollingDropdown"> Products</Nav.Link>


            <Nav.Link href= "/auth/my-profile/ListOfUsers" id="navbarScrollingDropdown">👤 USERS</Nav.Link>


            <Nav.Link href="/auth/my-profile/Demo" id="navbarScrollingDropdown">⚙️ Company Settings</Nav.Link> 
            {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
            
            <NavDropdown title="🛡️ Auth Settings " id="navbarScrollingDropdown">
            
              <NavDropdown.Item href="/auth/my-profile/ChangePassword"><Gear color='black' size={30}  />  Change Password</NavDropdown.Item>
              
              {/* <NavDropdown.Item href="/auth/my-profile/ListOfUsers">
              <ListStars color='black' size={25}  />  List of Users
              </NavDropdown.Item> */}
              
              {/* <NavDropdown.Item href="/auth/my-profile/CreateUser">
              <PersonAdd color='black' size={25}  />  Create User
              </NavDropdown.Item> */}

              {/* {/* <NavDropdown.Item href="/auth/my-profile/UpdateUserInfo"><Upload color='black' size={25}  />  Info</NavDropdown.Item> */}

              <NavDropdown.Item onClick={handleShow}><EnvelopeCheck color='black' size={30}  /> Verify Email</NavDropdown.Item> 

              {/* <NavDropdown.Item onClick={}><Trash2Fill color='black' size={25}  />  Delete User</NavDropdown.Item> */}



            </NavDropdown>
            
          </Nav>
        </Container>
      </Navbar>
       
    </nav>
    </>
  );
};
export default NavigationBar;