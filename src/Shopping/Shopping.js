import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { DatabaseFillUp, DoorClosedFill, DoorOpenFill, GearFill, HouseAddFill, Person, PersonAdd, PersonCircle, PersonFill, PersonSquare, ShopWindow, Trash2Fill, Upload, Cart4, Clipboard2CheckFill,} from "react-bootstrap-icons";
import { remCustomerToken } from "../services/TokenServices";
import Carousel from "react-bootstrap/Carousel";
import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import { secureGet } from "../services/HTTPservices";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem } from "../Shopping/Redux/Actions/index";
import SingleBuy from "./SingleBuy";
import Badge from 'react-bootstrap/Badge';
import { toast, Toaster } from "react-hot-toast";

function Shopping() {
  const myState = useSelector((state) => state.CartReducer);
  console.log(myState);
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const url = "/shop/products";
  const [loggedIn, setLoggedIn] = useState(
    JSON.parse(localStorage.getItem("customer-token")) || null
  );
  const [addedCart, setAddedCart] = useState(false)
  const navigate = useNavigate();
  const [curSingleBuy, setCurSingleBuy] = useState()

  const [showFilter, setShowFilter] = useState(false);
  const handleCloseFilter = () => setShowFilter(false);
  const handleShowFilter = () => setShowFilter(true);

  const [showSingleBuy, setShowSingleBuy] = useState(false);
  const handleCloseSingleBuy = () => setShowSingleBuy(false);
  const handleShowSingleBuy = () => setShowSingleBuy(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState();

  const [realData, setRealData] = useState();


  const pageInc = () => {
    setCurrentPage(currentPage + 1);
  };

  const pageDec = () => {
    setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    onSubmit(realData);
  }, [currentPage]);

  const onSubmit = (data) => {
    setRealData(data);

    const name = data?.name ? `&name=${data?.name}` : "";
    const limit = data?.limit ? `&limit=${data?.limit}` : "";
    const sortBy = data?.sortBy ? `&sortBy=${data?.sortBy}` : "";
    const page = `&page=${currentPage}`;
    const queryParameter = `${name}${limit}${sortBy}${page}`;

    const queryUrl = `/shop/products?${queryParameter}`;

    secureGet(queryUrl)
      .then((res) => {
        console.log(res);
        setData(res.data.results);

        setMaxPage(res.data.totalPages);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    secureGet(url)
      .then((res) => {
        setData(res.data.results);
        setMaxPage(res.data.totalPages);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const CustomerLogOut = () => {
    remCustomerToken();
    window.location.reload();
    console.log("loggedOut");
  };

  const onAddToCart = (item) => {
    item.quantity = 1
    item.subTotal = item.price * item.quantity
    dispatch(addItem(item))
    toast.success("item added to cart" )
  }
  const openSingleBuy = (currentBuy) => {
    console.log(currentBuy, "singlebuy");
    setCurSingleBuy(currentBuy)
    console.log(curSingleBuy, "cur buy");
    handleShowSingleBuy();
  }
  return (
    <>
    <div><Toaster/></div>
      <Modal size="lg" show={showSingleBuy} onHide={handleCloseSingleBuy} >
        <Modal.Header closeButton>
          <Modal.Title className="text-center"> BUY ITEM </Modal.Title>
        </Modal.Header>
        <Modal.Body> <SingleBuy curSingleBuy={curSingleBuy} /> </Modal.Body>

      </Modal>

      <Modal show={showFilter} onHide={handleCloseFilter}>
        <Modal.Header closeButton>
          <Modal.Title>FILTER</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {" "}
            <form
              bg="primary"
              className="text-center d-grid   "
              id="form-log"
              onSubmit={handleSubmit(onSubmit)}
            >
              NAME
              <input
                style={{ width: "70%" }}
                id="listForm"
                placeholder="name"
                type="text"
                {...register("name")}
              />
              LIMIT
              <input
                style={{ width: "70%" }}
                id="listForm"
                placeholder="limit"
                defaultValue="20"
                type="number"
                {...register("limit")}
              />
              <br></br>
              <label>SORT BY</label>
              <select
                style={{ width: "20%" }}
                className="form-select"
                id="select"
                aria-label="Default select example"
                {...register("sortBy")}
              >
                <option value="price">price</option>
                <option value="name">name</option>
              </select>
              <button
                className="btn btn-dark btn-lg btn-block mt-1"
                type="submit"
              >
                FILTER
              </button>
            </form>
          </div>
        </Modal.Body>
      </Modal>

      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            <ShopWindow color="white" size={30} /> SHOPPING
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={handleShowFilter} id="navbarScrollingDropdown">
                🔁 FILTER
              </Nav.Link>
              {/* <Nav.Link href="#pricing" id= "navbarScrollingDropdown">Pricing</Nav.Link> */}
            </Nav>
            <Nav >
              <Nav.Link as={Link} to={"shop/cart"} id="navbarScrollingDropdown">
                <Cart4 size={40} />
                <Badge bg="danger" >{myState.items.length}</Badge>
               
              </Nav.Link>
            </Nav>
            <Nav>
              {loggedIn ? (
                <>
                  <NavDropdown
                    title={<PersonFill color="white" size={45} />}
                    id="navbarScrollingDropdown"
                  >
                    <NavDropdown.Item href="shop/customers/update-profile">
                      <PersonCircle color="black" size={25} /> PROFILE
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={CustomerLogOut}>
                      <DoorOpenFill color="black" size={25} />
                      LOGOUT
                    </NavDropdown.Item>
                    <NavDropdown.Item href="shop/orders/details" > <Clipboard2CheckFill color="black" size={25} /> ORDERS</NavDropdown.Item>
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
                    href="shop/auth/login"
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
      </Navbar>

      <div className="row" id="shoppingCards">
        {data?.map((item, i) => {
          return (
            <Card className="cards mt-4 bg-light" style={{ width: "20rem" }} key={i}>
              <Carousel>
                {item.images.map((img,i) => {
                  return (
                    <Carousel.Item key={i}>
                      <Card.Img
                        variant="top"
                        className="mt-2"
                        style={{ height: "321px",width : "100%" }}
                        src={img.url}
                      />
                    </Carousel.Item>
                  );
                })}
              </Carousel>

              <Card.Body>
                <Card.Title
                  className="d-flex justify-content-center"
                  style={{ height: "20px" }}
                >
                  {item?.name}
                </Card.Title>

                <Card.Text className="d-flex justify-content-center">
                  PRICE : $ {item?.price}
                </Card.Text>

                <div className="d-flex justify-content-center">
                  {
                    myState.items?.find((fItem) => fItem._id === item._id)
                      ?
                      <>
                        <Button
                          variant="warning"
                          onClick={() => navigate("shop/cart")} > Go to Cart
                        </Button>
                      </>
                      :
                      <>
                        <Button
                          variant="primary"
                          onClick={() => onAddToCart(item)}
                        >
                          Add to Cart
                        </Button></>

                  }
                  <Button
                    className="ms-1"
                    variant="primary"
                    onClick={() => openSingleBuy(item)}
                  >
                    Buy Item
                  </Button>

                </div>
              </Card.Body>
            </Card>
          );
        })}

        <div className="d-flex justify-content-evenly mt-5">
          <ButtonToolbar aria-label="Toolbar with button groups">
            <ButtonGroup className="me-2" aria-label="First group">
              {currentPage > 1 ? (
                <Button onClick={pageDec}>PREV</Button>
              ) : (
                <></>
              )}
            </ButtonGroup>
            <ButtonGroup className="me-2" aria-label="Second group">
              <Button>{currentPage}</Button>
            </ButtonGroup>
            {maxPage <= currentPage ? (
              <></>
            ) : (
              <ButtonGroup aria-label="Third group">
                <Button onClick={pageInc}>NEXT</Button>
              </ButtonGroup>
            )}
          </ButtonToolbar>
        </div>
      </div>

    </>
  );
}

export default Shopping;
