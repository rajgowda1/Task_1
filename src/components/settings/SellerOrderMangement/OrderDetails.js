import React, { useEffect, useState } from 'react'
import { Card, ListGroup } from 'react-bootstrap'
import { secureGet } from '../../../services/HTTPservices'

function OrderDetails(item) {
    // console.log(item.item._id)
    const id = item.item._id
    const [details, setDetails] = useState()

    useEffect(() => {
        secureGet(`/orders/${id}`)
            .then((res) => {
                console.log(res.data);
                setDetails(res.data)

            })
            .catch((err) => {
                console.log(err);
            })
    }, [])


    return (

        <div>{details && details.map((item, i) => {

            return (
                <div>
                    

                    <Card className="text-center" style={{ width: '100%' }}>
                        <Card.Header><b>ORDER DETAILS</b></Card.Header>
                        <ListGroup variant="flush">

                            <ListGroup.Item><b> SellerId </b>: {item?.sellerId}</ListGroup.Item>
                            <ListGroup.Item><b> Created At </b>: {item?.createdAt}</ListGroup.Item>
                            <ListGroup.Item><b> Order Id </b>: {item?._id}</ListGroup.Item>
                            <ListGroup.Item><b> Created By </b>: {item?.createdBy}</ListGroup.Item>
                            <ListGroup.Item><b> PaymentStatus </b>: {item?.paymentStatus}</ListGroup.Item>
                            <ListGroup.Item><b> DeliveryFee</b> : {item?.deliveryFee}</ListGroup.Item>
                            <ListGroup.Item><b> Total </b>: {item?.total}</ListGroup.Item>
                        </ListGroup>
                    </Card>

                </div>
            )
        })}</div>
    )
}

export default OrderDetails