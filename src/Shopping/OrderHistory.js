import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { Arrow90degDown, Arrow90degUp, ArrowRight, Trash, Trash2, Trash2Fill } from 'react-bootstrap-icons'
import { secureGet, securePatch } from '../services/HTTPservices'
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';
import OrdersDetails from './orderManagement/OrdersDetails';
import ShopNavigationBar from './ShopNavigationBar';

function OrderHistory() {

    const url = "/shop/orders"
    
    const [orderDetails, setOrderDetails] = useState()
    const [curItemId, setCurId] = useState()

    useEffect(() => {

        secureGet(url)
            .then((res) => {
                console.log(res);
                setOrderDetails(res.data.results)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])
    console.log(orderDetails, "details");

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const cancelOrder = (id) => {
        const cancelUrl = `/shop/orders/cancel/${id}`
        console.log(cancelUrl);
        securePatch(cancelUrl)
        .then((res)=>{
            console.log(res);
        })
        .catch((err)=>{
            console.log(err);
        })


    }

    return (<>
        <Modal show={show} onHide={handleClose} >
            <Modal.Header closeButton>
                <Modal.Title className="text-center">ORDER DETAILS</Modal.Title>
            </Modal.Header>
            <Modal.Body> <OrdersDetails curItemId={curItemId}/>  </Modal.Body>

        </Modal>
        <ShopNavigationBar/>
        <div className='m-5'>

            <Table striped bordered hover variant="light">
                <thead>
                    <tr>
                        <th>NO</th>
                        <th>ORDER HISTORY</th>
                        <th>TOTAL</th>

                        <th>ORDER ID</th>
                        <th>STATUS</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        orderDetails && orderDetails.map((data, i) => {
                            return (<tr key={i}>
                                <td>{i + 1}</td>
                                <td>
                                    {data.items.map((names, i) => {
                                        return (<p> {i + 1}. {names?.name} * ( {names?.qty} ) = $ {names?.subTotal}</p>)
                                    })}</td>
                                <td>${data?.total}</td>
                                <td>{data?._id} {"   "}
                                    <Button variant="warning" className='m-2' onClick={() => {
                                        handleShow(); setCurId(data._id)
                                    }}>Details</Button>
                                    <Button variant="danger" onClick={()=>cancelOrder(data._id)}>Cancel</Button>


                                </td>


                                <td>{data?.status}</td>
                            </tr>)
                        })
                    }
                </tbody>
            </Table>
        </div>
    </>)
}

export default OrderHistory