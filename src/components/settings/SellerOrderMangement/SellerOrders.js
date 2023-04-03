import axios from 'axios'
import React, { useEffect, useState } from 'react'
import NavigationBar from '../../../BasicFunctionalities/NavigationBar'
import { secureGet, securePatch } from '../../../services/HTTPservices'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Container, ListGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { AirplaneEnginesFill, HouseCheckFill, Key, Truck, XCircle } from 'react-bootstrap-icons';
import Table from 'react-bootstrap/Table';
import OrderDetails from './OrderDetails';
import { Card } from 'react-bootstrap';


function SellerOrders() {

    const url = "/orders"
    const [orderData, setOrderData] = useState()
    const [orderDetails, setOrderDetails] = useState()

    useEffect(() => {
        secureGet(url)
            .then((res) => {
                console.log(res);
                setOrderData(res.data.results)
                console.log(orderDetails, "order data");
            })
            .catch((err) => {
                console.log(err);
            })



    }, [])


    const cancelOrderFun = (id) => {
        const cancelUrl = `/orders/cancel/${id}`
        console.log(cancelUrl, "CANCEL url");
        securePatch(cancelUrl)
            .then((res) => {
                console.log(res);
                window.location.reload()
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const dispatchFun = (id) => {
        const dispatchUrl = `/orders/dispatch/${id}`
        securePatch(dispatchUrl)
            .then((res) => {
                console.log(res);
                window.location.reload()
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const deliveredFun = (id) => {
        const deliveredUrl = `/orders/deliver/${id}`
        securePatch(deliveredUrl)
            .then((res) => {
                console.log(res);
                window.location.reload()
            })
            .catch((err) => {
                console.log(err);

            })
    }



    console.log(orderData, "orders data");
    return (
        <Container fluid className='' >
            <div className='text-center'>
                <NavigationBar />

                <div style={{ marginTop: "100px" }}>

                    {orderData && orderData.map((item, i) => {
                        return (
                        <div className='m-2 w-90 bg-white rounded' key={i}>
                            <div className='m-3 '>
                                <h6>Order  {i + 1} </h6>
                                
                                <h6>{item?.paymentStatus}  
                                {item?.status==="Cancelled" ? <h4 style={{color:"red"}}> CANCELLED </h4> :<></> }
                                {item?.status==="Delivered" ? <h4 style={{color:"#E1B804"}}> DELIVERED </h4> :<></> }
                                {item?.status==="Dispatched" ? <h4 style={{color:"#27A3D0"}}> DISPATCHED </h4> :<></> }
                                {item?.status==="Confirmed" ? <h4 style={{color:"#721FD9"}}> CONFIRMED </h4> :<></> }


                                </h6>
                                
                       
                                {/* <link onClick={""}>More</link> */}
                            </div>

                            <Tabs
                                // variant='info'
                                defaultActiveKey="1"
                                id="noanim-tab-example"
                                className="mb-3 "
                                transition={false}

                                justify

                            // defaultActiveKey="home"
                            // 
                            // id="noanim-tab-example"
                            // className=""
                            >
                                <Tab eventKey="1" title="Product Details">
                                    <div>
                                        <Table striped bordered hover size="sm">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Products</th>
                                                    <th>Price</th>
                                                    <th>quantity</th>
                                                    <th>subTotal </th>

                                                </tr>
                                            </thead>
                                            <>

                                                <tbody >

                                                    {item.items && item.items.map((prod, m) => {
                                                        return (
                                                            <tr key={m}>
                                                                <td>{m + 1}</td>
                                                                <td>{prod?.name}</td>
                                                                <td>{prod?.price}</td>
                                                                <td>{prod?.qty}</td>
                                                                <td>{prod?.subTotal}</td>

                                                            </tr>
                                                        )
                                                    })}
                                                    <tr>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td>TOTAL :</td>
                                                        <td>{item?.total}</td>

                                                    </tr>
                                                </tbody>
                                            </>

                                        </Table>
                                    </div>
                                </Tab>
                                <Tab eventKey="2" title="Delivery Details">
                                    <div>

                                        <Card className="text-center" style={{ width: '100%' }}>
                                            <Card.Header><b>ADDRESS</b></Card.Header>
                                            <ListGroup variant="flush">
                                                
                                                <ListGroup.Item><b>street </b>: {item?.address.street}</ListGroup.Item>
                                                <ListGroup.Item><b>addressLine2 </b>: {item?.address.addressLine2}</ListGroup.Item>
                                                <ListGroup.Item><b>city </b>: {item?.address.city}</ListGroup.Item>
                                                <ListGroup.Item><b>state </b>:{item?.address.state}</ListGroup.Item>
                                                <ListGroup.Item><b>pin</b> : {item?.address.pin}</ListGroup.Item>


                                            </ListGroup>
                                        </Card>
                                       

                                    </div>
                                </Tab>
                                <Tab eventKey="3" title="Order Details" >
                                    <div>
                                        <OrderDetails item={item} />
                                    </div>
                                </Tab>
                                <Tab eventKey="4" title="Actions" >

                                    <ButtonGroup className='w-100  d-flex justify-content-center'>


                                        {item.status === "Cancelled"
                                            ?
                                            <div className=' border w-100'>
                                                <Card className="text-center" >
                                                    <Card.Body className='w-100' >
                                                        <h4 style={{color:"red"}} className=''>The Item Has Been Cancelled</h4>
                                                    </Card.Body>
                                                </Card>

                                            </div>
                                            :
                                            <div className=' m-1'>
                                                <div className='d-flex'>
                                                {item.status === "Delivered" ? <>
                                                    <div className='p-5  text-center ' >

                                                        <XCircle size={50} color="red" onClick={() => { cancelOrderFun(item._id) }} ></XCircle>
                                                        <p>CANCEL</p>

                                                    </div>
                                                </> : <></>}

                                                {item.status === "Dispatched" ?
                                                    <>
                                                        <div className='p-5 text-center'>
                                                            <XCircle size={50} color="red" onClick={() => { cancelOrderFun(item._id) }} ></XCircle>
                                                            <p>CANCEL</p>
                                                        </div>

                                                        <div className='p-5  text-center'>
                                                            <HouseCheckFill size={50} color="black" onClick={() => { deliveredFun(item._id) }}></HouseCheckFill>
                                                            <p>DELIVER</p>
                                                        </div>


                                                    </> : <></>}

                                                {item.status === "Confirmed" ?
                                                    <>
                                                        <div className='p-5 text-center'>
                                                            <XCircle size={50} color="red" onClick={() => { cancelOrderFun(item._id) }} ></XCircle>
                                                            <p>CANCEL</p>
                                                        </div>

                                                        <div className='p-5 text-center'>
                                                            <AirplaneEnginesFill size={50} color="blue" onClick={() => { dispatchFun(item._id) }} ></AirplaneEnginesFill>
                                                            <p>DISPATCH</p>
                                                        </div>


                                                    </> : <></>}
                                                </div>           
                                            </div>
                                        }

                                    </ButtonGroup>


                                </Tab>
                            </Tabs>

                        </div>)
                    })}


                </div>
            </div>
        </Container >

    )
}

export default SellerOrders

