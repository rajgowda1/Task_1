import React, { useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import AddProducts from './AddProducts';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { secureGet } from '../services/HTTPservices';
import Product from './Product';
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';

function HomeProducts() {
    
    const [productsData,setProductsData]=useState()
    const navigate=useNavigate()
   

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true); 



    const Addproducts = () => {
      console.log("clicked");
      setShow(true)

    }
    console.log(productsData);

    useEffect(()=>{
      const url='/products'
        secureGet(url)  

        .then((res)=>{
        
            setProductsData(res.data.results)
            
          //  console.log(productsData);
        })
        .catch((err)=>{
            console.log(err);
        })
        
    },[])    

  return (


    <div className="productsDi"> 

<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body><AddProducts/></Modal.Body>
       
      </Modal>

<Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={Addproducts} >Add Products</Nav.Link>

            <Nav.Link href="/my-profile">back</Nav.Link>

            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item  href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <div className="row">
   {productsData && productsData.map((item)=>
   { 
    return(
        
  
        <div className="col-3">

  <Card className='cards mt-5' style={{ width: '18rem' }}>


      {/* <Card.Img  style={{height: '18rem' }} variant="top" src={item.images[0].url} /> */}

      <Carousel>
{item.images.map((img)=>{
  return(

    <Carousel.Item style={{height: '18rem' }}  variant="top" interval={1000}>
    <img
      className="d-block w-100"
      src={img.url}
      alt="First slide"
    />
  </Carousel.Item>
  )
})}
     

      </Carousel>

      <Card.Body>
        <Card.Title style={{height: '5rem' }}>{item.name}</Card.Title>
        
        
        <Card.Text  style={{height: '2rem' }} >
         ${item.price}
        </Card.Text>
        <Button onClick= {()=>navigate(`/products/product?pid=${item._id}`)} variant="primary">MORE</Button>
      </Card.Body>
    </Card> </div>
)})}


</div> 
</div>
  )
}

export default HomeProducts