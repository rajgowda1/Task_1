import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CartReducer from './Redux/Reducers/CartReducer'
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import { secureGet, securePost } from '../services/HTTPservices';
import { Prev } from 'react-bootstrap/esm/PageItem';
import { Navigate, useNavigate } from 'react-router-dom';
import ShopNavigationBar from './ShopNavigationBar';
import { DatabaseFillUp, DeviceHddFill } from 'react-bootstrap-icons';
import AddNewAdd from './Settings/AddNewAdd';
import { clearCart } from './Redux/Actions';


export default function Orders() {
  const myState = useSelector((state) => state.CartReducer)
  console.log(myState, "storeData");
  const dispatch = useDispatch()

  const [selectedValue, setSelectedValue] = useState();
  const [addData, setAddData] = useState([])

  const addUrl = "/customers/address"
  const createOrder = "/shop/orders"
  const navigate = useNavigate();

  let total = 0
  const subtotals = myState.items.map((item) => {
    total += item.subTotal;
    return total;

  });
  console.log(total);

  useEffect(() => {
    secureGet(addUrl)
      .then((res) => {

        setAddData(res.data)

      })
      .catch((err) => {
        console.log(err);
      })
  }, [])
  console.log(addData.length, "addressData");

  const handleChange = (item) => {
    setSelectedValue(item);
    console.log(item);

  }

  const submit = () => {
    const items = myState.items.map((item) => {

      const abc = {
        productId: item._id,
        name: item.name,
        price: item.price,
        qty: item.quantity,
        subTotal: item.subTotal
      }
      return abc
    })

    console.log(items);

    const data =
    {
      items,
      deliveryFee: 40,
      total: total,
      address: selectedValue
    }
    console.log(data);

    securePost(createOrder, data)
      .then((res) => {
        console.log(res.data.order._id);
        dispatch(clearCart())
        navigate(`/shop/orders/confirm?userId=${res.data.order._id}`)

      })
      .catch((err) => {
        console.log(err);
      })
  }


  return (
    <>
      <ShopNavigationBar />

      <Container >

        <Row>
          <Col sm={8}><div className='mt-3 mb-3'>
            <h2 className='text-white text-center mb-3'>ITEMS IN CART</h2>
            {myState.items.map((item, i) => {
              return (
                <div className='d-flex justify-content-center  ' >

                  <div className='d-flex  justify-content-center rounded bg-white mt-1'>

                    <div className='p-1   ' style={{ width: '140px', height: '140px' }}>
                      <Image className='' style={{ width: '140px', height: '140px' }} src={item?.images[0].url} />
                    </div>
                    <div className='m-2 p-3  ' style={{ width: '180px', height: '140px' }}>

                      <div >Product : {item?.name}</div>
                      <div> Item Cost : ${item?.price}</div>
                      <div> Quantity : {item?.quantity}</div>
                    </div>

                    <div className='m-2 p-3 ' style={{ width: '180px', height: '140px' }}>

                      <div>Subtotal : ${item?.subTotal}</div>
                      <div>Delivery Cost : $40</div>

                    </div>
                  </div>
                </div>
              )
            })}
          </div></Col>
          <Col md={4}>
            <div >

              <div className='d-flex justify-content-center rounded mt-3 mb-3'>
                <h2 className='text-white'>SELECT ADDRESS</h2>
              </div>
                <Accordion className='accordian text-center mb-3 '>

                  <Accordion.Item eventKey="1" className='authHeader'>
                    <Accordion.Header><DatabaseFillUp color='black' size={25} />. ADD NEW ADDRESS</Accordion.Header>
                    <Accordion.Body className='authSetting'>

                      <AddNewAdd />
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>

                {addData.map((item, i) => {
                  return (

                    <div className='d-flex bg-white justify-content-start align-items-center  rounded'>

                      <input
                        className='ms-3'
                        type="radio"
                        value={item}
                        name='addressRadio'

                        onChange={() => handleChange(item)}
                      />
                      <label className='m-2 p-2'>{item?.street} , {item?.addressLine2} , {item?.city} , {item?.state} , {item?.pin}</label>
                    </div>
                  )
                })}
             

              {addData.length === 0 ? <>  </> : <>
                <div className='d-flex justify-content-center mt-5'>
                  <Button variant="warning" onClick={submit}>Proceed to Checkout</Button>
                </div></>}
            </div>
          </Col>
        </Row>

      </Container>
    </>
  )
}

