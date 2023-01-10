import React from 'react'
import Shopping from './Shopping'
import ShopNavigationBar from './ShopNavigationBar'
import { Container, Row, Col, Image, Button } from 'react-bootstrap';

import { useSelector,useDispatch } from 'react-redux';
import Card from 'react-bootstrap/Card';
import { increaseQuantity,decreaseQuantity } from './Redux/Actions';



function Cart() {
  const dispatch = useDispatch()
  const myState = useSelector((state)=>state.CartReducer)
  console.log(myState.items);
  return (
   <>
    <ShopNavigationBar  />

   
    <Container className='mt-5'>

     {myState.items.map((item,i)=>{ return(<> 
    <Card>
      
      <Card.Body>
      <Row>
        {i+1}
        <Col xs={2}>
          <Image style={{width:'100px', height:'100px'}} src={item.images[0].url} />
        </Col>
        <Col xs={2}>{item.name}</Col>
        <Col xs={2}>
          <Button onClick={()=>dispatch(increaseQuantity(item))}>+</Button>
          <span className="p-3 mb-2 bg-white rounded" >5</span>
          <Button onClick={""}>-</Button>
        </Col>
        <Col xs={2}>$</Col>
      </Row>
      </Card.Body>
    </Card>
    </>)})}
    </Container>


    <Container className='mt-5'>
      
      <Row>
        <Col xs={10}>        </Col>
        
        <Col xs={2} className="p-3 mb-2 bg-white rounded" style={{border: '2px solid black'}}>GRAND TOTAL : $ {myState?.grandTotal}</Col>
      </Row>
    </Container>
   </>
  )
}

export default Cart