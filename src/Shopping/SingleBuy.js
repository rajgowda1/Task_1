import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { Trash2Fill } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { secureGet } from '../services/HTTPservices';
import { useDispatch,useSelector } from 'react-redux';
import { addItem } from './Redux/Actions';

function SingleBuy(item) {
  const myState = useSelector((state)=>state.CartReducer)
  console.log(myState,"StoreState");
  const dispatch = useDispatch()
  const [curItem, setCurItem] = useState(item.curSingleBuy)
  const [quantity, setQunatity] = useState(1)
  const [qty, setQty] = useState(1)
  const [addData, setAddData] = useState([])
  console.log(curItem);
  const addUrl = "/customers/address"
  const createOrder = "/shop/orders"

  secureGet()
  const navigate = useNavigate()

  const incQty = () => {
    setQty(qty + 1)
  }
  const decQty = () => {
    setQty(qty - 1)
  }

  const buy = () => {
    curItem.quantity=qty
    curItem.subTotal=curItem.price*qty
    console.log(curItem,"itemData");
    dispatch(addItem(curItem))
    navigate(`/shop/orders?id=${curItem._id}`)
  }


  return (
    <div>
      <div>
        <Container>
          <Row>
            <Col md={8}>
              <div className=' rounded d-flex justify-content-center bg-white m-1'>

                <div className='d-flex justify-content-center align-items-center' style={{ width: '130px', height: '130px', marginTop: "15px" }} >
                  <Image style={{ width: '120px', height: '120px' }} src={curItem.images[0]?.url} />
                </div>

                <div className='text-center m-3' style={{ width: '180px', height: '130px' }} >

                  <div >Product Name : {curItem?.name}</div>
                  <div>Item Cost : ${curItem?.price}</div>
                  <div>Subtotal : ${qty * curItem?.price}</div>

                </div>
              </div>

            </Col>
            <Col md={4}>
              <div className='d-flex justify-content-center align-items-center  ' style={{ width: '190px', height: '130px' }} >


                {qty == 1 ?
                  <></>

                  : <Button onClick={decQty}>-</Button>}

                <div className="p-1 m-3 text-dark  rounded" > {qty} </div>

                <Button onClick={incQty}>+</Button>

              </div>
              <div className='d-flex justify-content-center'>
                <Button variant='danger' onClick={buy} >Buy</Button>
              </div>
            </Col>

          </Row>
        </Container>


      </div>

    </div>
  )
}

export default SingleBuy