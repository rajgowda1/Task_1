import React, { useEffect, useState } from 'react'

import { Card } from 'react-bootstrap'
import { get } from 'react-hook-form';
import { secureGet } from '../../services/HTTPservices';

function OrdersDetails(curItemId) {
  const id = curItemId.curItemId
  const url = `/shop/orders/${id}`
  console.log(url);
  console.log(id);
  const [data,setdata]=useState()

  useEffect(()=>{
    secureGet(url)
    .then((res) => {
      console.log(res);
      setdata(res.data)
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    })
  },[])

 
    console.log(data);
  return (
    <div className='text-center'>
      {data ? <>
      <Card>
        <Card.Body>
          <Card.Title>{}</Card.Title>
          <Card.Text> 
          ITEMS IN CART :<hr/>
            {data.items.map((names, i) => {
                                        return (<><p>   {i + 1}. {names?.name} </p>
                                                <p>Cost : {names?.price}</p>
                                                <p>Quantity : {names?.qty}</p>
                                                <p>Sub Total : {names?.subTotal}</p>
                                                <hr/>
                                       
                                        <p></p>

                                         {/* Quantity( {names?.qty} ) = Subtotal : {names?.subTotal} */}
                                      </>)
                                    })}

            
            <Card.Text>
             
                Delivery Address : 
                <p>{data?.address.street},{data?.address.addressLine2},{data?.address.city},{data?.address.state},{data?.address.pin}</p>
                <p>Delivery Cost : {data.deliveryFee}</p>
            </Card.Text>
            <hr/>
            Payment Status : {data?.paymentStatus} <br />
            OrderStatus : {data?.status} <br />
            <hr/>
            <p>TOTAL : ${data?.total}</p>
           
          </Card.Text>
        </Card.Body>
        
      </Card>
      </> : <></>}
    </div>
  )
}

export default OrdersDetails