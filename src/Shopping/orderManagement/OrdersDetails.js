import React, { useEffect, useState } from 'react'

import { Card } from 'react-bootstrap'
import { get } from 'react-hook-form';
import { secureGet } from '../../services/HTTPservices';

function OrdersDetails(curItemId) {
  const id = curItemId.curItemId
  const url = `/shop/orders/${id}`
  console.log(url);
  console.log(id);
  const [data, setdata] = useState()

  useEffect(() => {
    secureGet(`url?page=${4}`)
      .then((res) => {
        console.log(res);
        setdata(res.data)
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])


  console.log(data);
  return (
    <div className='text-center'>
      {data ? <>
        <Card>
          <Card.Body>
            <Card.Title>{ }</Card.Title>
            <Card.Text>
              <h5>ITEMS IN CART :</h5><hr />
              {data.items.map((names, i) => {
                return (<><h5>   {i + 1}. {names?.name} </h5>
                  <p>Cost : {names?.price}</p>
                  <p>Quantity : {names?.qty}</p>
                  <p>Sub Total : {names?.subTotal}</p>
                  <hr />

                  <p></p>
                </>)
              })}
              <Card.Text>

                <h5>Delivery Address : </h5>
                <p>{data?.address.street},{data?.address.addressLine2},{data?.address.city},{data?.address.state},{data?.address.pin}</p>
                <p>Delivery Cost : {data.deliveryFee}</p>
              </Card.Text>
              <hr />
              Payment Status : {data?.paymentStatus} <br />
              OrderStatus : {data?.status} <br />
              <hr />
              <h5>TOTAL : ${data?.total}</h5>

            </Card.Text>
          </Card.Body>

        </Card>
      </> : <></>}
    </div>
  )
}

export default OrdersDetails