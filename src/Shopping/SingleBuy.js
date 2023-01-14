import React from 'react'
import { Container, Row, Col, Image, Button } from 'react-bootstrap';



function SingleBuy() {


  return (
    <div> 
        <div>
            <Container>
                <Row>
                    <Col md={8}> 
                    <div className=' rounded d-flex justify-content-center bg-white m-1'>




                        <div className='d-flex justify-content-center align-items-center' style={{ width: '130px', height: '130px', marginTop: "15px" }} >
                          <Image style={{ width: '120px', height: '120px' }} src={""} />
                        </div>

                        <div className='text-center m-3' style={{ width: '180px', height: '130px' }} >

                          <div >Product Name</div>
                          <div>Item Cost : ${""}</div>
                          <div>Subtotal : ${""}</div>

                        </div>
                </div>
                    
                    </Col>
                    <Col md={4}>
                    <div className='d-flex justify-content-center align-items-center  ' style={{ width: '190px', height: '130px' }} >
                         
                           

                            <Button onClick={""}>-</Button>
                          

                          <div className="p-1 m-3 text-dark  rounded" > 2 </div>

                          <Button onClick={""}>+</Button>

                        </div>
                    </Col>

                </Row>
            </Container>


        </div>
        
</div>
  )
}

export default SingleBuy