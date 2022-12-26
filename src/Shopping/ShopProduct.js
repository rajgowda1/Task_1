import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ShopNavigationBar from './ShopNavigationBar';

import Card from 'react-bootstrap/Card';
import { Button, ButtonGroup } from 'react-bootstrap';

function ShopProduct() {
  return (<>
  <ShopNavigationBar/>
    {/* <div className='row'>ShopProduct</div>
        <div className='col'>1</div> */}
        <Container>
      <Row>
        
        <Col>
        <div>   
                  <Card className='cards mt-5' onClick={ShopProduct} >

                        
                  <Card.Img variant="top" className='mt-2' style={{height:'300px'}}/>

                  <Card.Body>
                    
                    <Card.Title className='d-flex justify-content-center' style={{height:"20px"}}></Card.Title>

                    <Card.Text className='d-flex justify-content-center'>
                    PRICE : $ {}
                    </Card.Text >
                       <div className='d-flex justify-content-center'>

                        <Button variant="primary" >Add to Cart</Button>

                      </div> 
                  
                  </Card.Body>

                 </Card> 
         </div>
       </Col>
        <Col className='bg-warning' style={{height:"100vh",border:"2px black"}} md={9}>2 of 1</Col>
      </Row>
    </Container>
  
        </>)
}

export default ShopProduct