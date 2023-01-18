import React from 'react'
import { Navbar , Nav, Container} from 'react-bootstrap'

function NavigationProducts() {
  return (
    <div> <Navbar bg="dark" expand="lg">
    <Container>
      <Navbar.Brand href="#home"  id="navbarScrollingDropdown">React-Bootstrap</Navbar.Brand>

        <Nav className="justify-content-end">
      
          <Nav.Link href="/seller/my-profile" id="navbarScrollingDropdown">🏠 HOME</Nav.Link>

          <Nav.Link href="/seller/products" id="navbarScrollingDropdown"> 🛍️ PRODUCTS</Nav.Link>

          <Nav.Link href= "/" id="navbarScrollingDropdown">🛍️ Shopping</Nav.Link>

        </Nav>
    
    </Container>
  </Navbar></div>
  )
}

export default NavigationProducts