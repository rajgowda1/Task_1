import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Bag, BagFill, Cart4, Clipboard2CheckFill, DatabaseFillUp, DoorClosedFill, DoorOpenFill, GearFill, HouseAddFill, Link, Person, PersonAdd, PersonCircle, PersonFill, ShopWindow, Trash2Fill, Upload } from 'react-bootstrap-icons';
import { Navigate, useNavigate } from 'react-router-dom';
import { remCustomerToken } from '../services/TokenServices';
import Badge from 'react-bootstrap/Badge';
import { useSelector, useDispatch } from 'react-redux';

function ShopNavigationBar() {

  const myState = useSelector((state) => state.CartReducer)
  console.log(myState);
  const navigate = useNavigate()
  const CustomerLogOut = () => {
    remCustomerToken()
    navigate('/')
  }


   
  const [logged, setLogged] = useState(
    JSON.parse(localStorage.getItem("customer-token")) || null
  );
  console.log(logged);

  return (
    <><Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">{<ShopWindow color='white' size={30} />} SHOPPING</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Nav >
            <Nav.Link href="/shop/cart" id="navbarScrollingDropdown">
              <Cart4 size={40} />
              <Badge bg="danger">{myState.items.length}</Badge>
            </Nav.Link>
          </Nav>
          <Nav>
            {logged ? (
              <>

                <NavDropdown
                  title={<PersonFill color="white" size={45} />}
                  id="navbarScrollingDropdown"
                >
                  <NavDropdown.Item href="/shop/customers/update-profile">
                    <PersonCircle color="black" size={25} /> PROFILE
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={CustomerLogOut}>
                    <DoorOpenFill color="black" size={25} />
                    LOGOUT
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/shop/orders/details" > <Clipboard2CheckFill color="black" size={25} /> ORDERS</NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link
                  href="/shop/auth/register"
                  id="navbarScrollingDropdown"
                >
                  <HouseAddFill color="white" size={25} /> SIGN UP
                </Nav.Link>
                <Nav.Link
                  eventKey={2}
                  href="/shop/auth/login"
                  id="navbarScrollingDropdown"
                >
                  {" "}
                  <DoorOpenFill color="white" size={25} />
                  SIGN IN
                </Nav.Link>{" "}
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar></>
  )
}

export default ShopNavigationBar



