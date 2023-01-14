import React, { useState } from 'react'
import Shopping from './Shopping'
import ShopNavigationBar from './ShopNavigationBar'
import { Container, Row, Col, Image, Button } from 'react-bootstrap';

import { useSelector, useDispatch } from 'react-redux';
import Card from 'react-bootstrap/Card';
import { increaseQuantity, decreaseQuantity, removeItem, grandTotal } from './Redux/Actions';
import { Trash2Fill } from 'react-bootstrap-icons';
import { Link, useNavigate } from 'react-router-dom';




function Cart() {
  const dispatch = useDispatch()
  const myState = useSelector((state) => state.CartReducer)
  console.log(myState.items.length);
  const navigate = useNavigate()

  const [loggedIn, setLoggedIn] = useState(
    JSON.parse(localStorage.getItem("customer-token") || null)
  )

  // (myState.items.length == 0 && navigate("/"))



  let total = 0
  const subtotals = myState.items.map((item) => {
    total += item.subTotal;
    return total;

  });
  // console.log();
  // dispatch(grandTotal(total))

  return (
    <div>
      {myState.items.length == 0 ? 
      <div className='text-center justify-content-center'>
        <h1>No items in Cart</h1>  
      <Button variant='dark' onClick={()=>navigate("/")}>Continue Shopping</Button>
      </div> : <>
        <ShopNavigationBar />

        <Container>
          <div className='d-flex justify-content-center mt-5' >
            <Row>

              <Col sm={8}>
                <div className=' p-3 mt-1 mb-1'>

                  {myState.items.map((item, i) => {
                    return (<>
                      <div className=' rounded d-flex justify-content-center bg-white m-1'>




                        <div className='d-flex justify-content-center align-items-center' style={{ width: '130px', height: '130px', marginTop: "15px" }} >
                          <Image style={{ width: '120px', height: '120px' }} src={item.images[0].url} />
                        </div>

                        <div className='text-center m-3' style={{ width: '180px', height: '130px' }} >

                          <div >{item.name}</div>
                          <div>Item Cost : ${item.price}</div>
                          <div>Subtotal : ${item.subTotal}</div>

                        </div>

                        <div className='d-flex justify-content-center align-items-center  ' style={{ width: '190px', height: '130px' }} >
                          {item.quantity === 1 ?
                            <Button variant="danger" onClick={() => dispatch(removeItem(item._id))}><Trash2Fill /></Button>
                            :

                            <Button onClick={() => dispatch(decreaseQuantity(item))}>-</Button>
                          }

                          <div className="p-1 m-3 text-dark  rounded" > {item.quantity} </div>

                          <Button onClick={() => dispatch(increaseQuantity(item))}>+</Button>

                        </div>



                      </div>
                    </>)
                  })}

                </div>

              </Col>


              <Col sm={4}> <div className="p-3 mt-1 mb-1  d-flex  justify-content-center " >

                <div className='text-center rounded bg-white' style={{ height: "150px", width: "444px", }}>
                  <h4 className='mt-4'>GRAND TOTAL : $ {total}</h4>
                  <h4>Delivery Fee : $ 40</h4>

                  {loggedIn ?

                    <Button variant="warning" onClick={() => navigate("/shop/orders")}>Proceed to Checkout</Button>
                    : <>
                      <h5 className='text-danger m-2 '>PLEASE LOG IN TO CHECKOUT</h5>
                      <Link to="/shop/auth/login">log in</Link>
                    </>

                  }


                </div>
              </div>
              </Col>
            </Row>
          </div>
        </Container>







      </>}
    </div>
  )
}

export default Cart