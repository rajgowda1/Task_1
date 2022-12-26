import React from 'react'
import { Navbar , Nav, Container} from 'react-bootstrap'
import AddProducts from './AddProducts'



function NavigationProducts() {
  return (
    <div> <Navbar bg="dark" expand="lg">
    <Container>
      <Navbar.Brand href="#home"  id="navbarScrollingDropdown">React-Bootstrap</Navbar.Brand>

        <Nav className="justify-content-end">
          {/* <Nav.Link onClick={AddProducts}  id="navbarScrollingDropdown" >	 🥾 ADD PRODUCTS</Nav.Link> */}

          <Nav.Link href="/seller/my-profile" id="navbarScrollingDropdown">🏠 HOME</Nav.Link>

          <Nav.Link href="/seller/products" id="navbarScrollingDropdown"> 🛍️ PRODUCTS</Nav.Link>

          <Nav.Link href= "/" id="navbarScrollingDropdown">🛍️ Shopping</Nav.Link>

          {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item  href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown> */}
        </Nav>
    
    </Container>
  </Navbar></div>
  )
}

export default NavigationProducts