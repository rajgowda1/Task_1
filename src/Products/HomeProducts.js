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
import { useForm } from 'react-hook-form';
import { getToken } from '../services/TokenServices';



import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';


function HomeProducts() {
  const token = getToken();
  const [productsData, setProductsData] = useState()
  const navigate = useNavigate()


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showFilter, setShowFilter] = useState(false);
  const handleCloseFilter = () => setShowFilter(false);
  const handleShowFilter = () => setShowFilter(true);

  const [currentPage, setCurrentPage] = useState(1)

  const [realData, setRealData] = useState()

  const pageInc = () => {
    setCurrentPage(currentPage + 1)
  }

  const pageDec = () => {
    setCurrentPage(currentPage - 1)
  }

  const Addproducts = () => {
    console.log("clicked");
    setShow(true)

  }
  console.log(productsData);

  useEffect(() => {
    const url = '/products'
    secureGet(url)

      .then((res) => {

        setProductsData(res.data.results)

        //  console.log(productsData);
      })
      .catch((err) => {
        console.log(err);
      })

  }, [])

  useEffect(() => {
    onSubmit(realData);
  }, [currentPage])

  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    setRealData(data)

    const name = (data?.name ? `&name=${data?.name}` : '')
    const limit = (data?.limit ? `&limit=${data?.limit}` : '')
    const sortBy = (data?.sortBy ? `&sortBy=${data?.sortBy}` : '')
    const page = `&page=${currentPage}`
    const queryParameter = `${name}${limit}${sortBy}${page}`

    axios.get(`https://shop-api.ngminds.com/products?${queryParameter}`,
      {
        headers:
          { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        console.log(response);
        setProductsData(response.data.results)

        handleCloseFilter()

        // console.log(response.data.page);
      })
      .catch((error) => {
        console.log(error);
      })



  }

  return (


    <div className="productsDi">

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="text-center">ADD</Modal.Title>
        </Modal.Header>
        <Modal.Body><AddProducts /></Modal.Body>

      </Modal>

      <Modal show={showFilter} onHide={handleCloseFilter}>
        <Modal.Header closeButton>
          <Modal.Title>FILTER</Modal.Title>
        </Modal.Header>
        <Modal.Body><div>
          <form bg="primary" className='text-center d-grid   ' id='form-log' onSubmit={handleSubmit(onSubmit)}>
            NAME
            <input style={{ width: "70%" }} id='listForm'
              placeholder='name'
              type="text"
              {...register("name")}
            />
            LIMIT
            <input style={{ width: "70%" }} id='listForm'
              placeholder='limit'
              type="number"
              {...register("limit")}
            />


            <br></br>
            <label>SORT BY</label>
            <select style={{ width: "20%" }} className="form-select" id='select' aria-label="Default select example" {...register("sortBy")}>
              <option value="price">price</option>
              <option value="name">name</option>



            </select>



            <button className='btn btn-dark btn-lg btn-block mt-1' type='submit'>FILTER</button>

          </form></div></Modal.Body>

      </Modal>

      <Navbar bg="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home" id="navbarScrollingDropdown">React-Bootstrap</Navbar.Brand>


          <Nav className="justify-content-end">

            <Nav.Link href="/seller/my-profile" id="navbarScrollingDropdown">🏠 HOME</Nav.Link>

            <Nav.Link onClick={Addproducts} id="navbarScrollingDropdown" >	 🥾 ADD PRODUCTS</Nav.Link>

            <Nav.Link href="/" id="navbarScrollingDropdown">🛍️Shopping</Nav.Link>


            <Nav.Link onClick={handleShowFilter} id="navbarScrollingDropdown"> FILTER</Nav.Link>


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
      </Navbar>
      <Container>
        <div className="row">
          {productsData && productsData.map((item, i) => {
            return (


              <div className="col-3" key={i}>

                <Card className='cards mt-5' style={{ width: '18rem' }}>


                  {/* <Card.Img  style={{height: '18rem' }} variant="top" src={item.images[0].url} /> */}

                  <Carousel>
                    {item.images && item.images.map((img, i) => {

                      return (

                        <Carousel.Item style={{ height: '18rem' }} variant="top" interval={1000} key={i} >
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
                    <Card.Title style={{ height: '5rem' }}>{item?.name}</Card.Title>


                    <Card.Text style={{ height: '2rem' }} >
                      ${item?.price}
                    </Card.Text>
                    <Button onClick={() => navigate(`/seller/products/product?pid=${item?._id}`)} variant="primary">MORE</Button>
                  </Card.Body>
                </Card> </div>
            )
          })}


        </div>
      </Container>
      <br></br>
      <div className="d-flex justify-content-evenly mb-5">

        <ButtonToolbar aria-label="Toolbar with button groups">
          <ButtonGroup className="me-2" aria-label="First group">
            {(currentPage > 1 ? <Button onClick={pageDec}>PREV</Button> : <></>)}
          </ButtonGroup>
          <ButtonGroup className="me-2" aria-label="Second group">
            <Button>{currentPage}</Button>
          </ButtonGroup>
          <ButtonGroup aria-label="Third group">
            <Button onClick={pageInc}>NEXT</Button>

          </ButtonGroup>
        </ButtonToolbar>

      </div>
    </div>
  )
}

export default HomeProducts