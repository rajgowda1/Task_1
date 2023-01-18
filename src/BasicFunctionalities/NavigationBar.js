import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Gear, EnvelopeCheck, ListTask, Table } from 'react-bootstrap-icons';
import SendVerifyEmail from '../components/AuthSettings/SendVerifyEmail';
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
        <Navbar bg="dark" variant="dark" fixed="top" >
          <Container>



            <Navbar.Brand href="#home" id="textLogo" >LOGO </Navbar.Brand>
            <Nav className="justify-content-end">
              <Nav.Link href="/seller/my-profile" id="navbarScrollingDropdown">🏠 Home</Nav.Link>

              <Nav.Link href="/seller/products" id="navbarScrollingDropdown">🛍️  Products</Nav.Link>

              <Nav.Link href="/" id="navbarScrollingDropdown">🛍️Shopping</Nav.Link>


              <Nav.Link href="/seller/auth/my-profile/ListOfUsers" id="navbarScrollingDropdown">👤 USERS</Nav.Link>


              <Nav.Link href="/seller/auth/my-profile/Demo" id="navbarScrollingDropdown">⚙️ Company Settings</Nav.Link>
              <NavDropdown title="🛡️ Auth Settings " id="navbarScrollingDropdown">


                <NavDropdown.Item href="/seller/auth/my-profile/ChangePassword"><Gear color='black' size={30} />  Change Password</NavDropdown.Item>

                <NavDropdown.Item onClick={handleShow}><EnvelopeCheck color='black' size={30} /> Verify Email</NavDropdown.Item>

                <NavDropdown.Item ><Table color='black' size={30} /> Verify Email</NavDropdown.Item>


              </NavDropdown>

            </Nav>
          </Container>
        </Navbar>

      </nav>
    </>
  );
};
export default NavigationBar;