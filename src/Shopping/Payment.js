
import React, { useState } from 'react';
import { Card, Form, Col, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { toast, Toaster } from 'react-hot-toast';
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { put } from '../services/HTTPservices';


const Payment = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get('userId'))
  const token = searchParams.get('userId')
  const url = `/shop/orders/confirm/${token}`
  console.log(url);
  const onSubmit = data => {
    console.log(data);

    put(url, data)
      .then((res) => {
        console.log(res);
        toast.success("Payment Successful")

        navigate("/")
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message)
      })
  };

  return (<>
    <div><Toaster /></div>
    <Card className="mx-auto mt-5" style={{ width: '30rem' }}>
      <Card.Body >
        <form onSubmit={handleSubmit(onSubmit)} className='text-center d-grid h-100 mt-5 ' >
          <h3 className='text-dark'>ENTER CARD DETAILS </h3>

          <div className="form-group mt-3">
            <label>NAME ON CARD</label>
            <input
              type="text"
              placeholder="NAME"
              className="form-control"
              {...register("nameOnCard", { required: true, minLength: 4, maxLength: 20 })}
            />
          </div>
          {errors.nameOnCard && <p className="text-warning">please check nameOnCard</p>}

          <div className="form-group mt-3">
            <label>CARD NUMBER</label>
            <input
              type="number"
              placeholder="CARD NUMBER"
              className="form-control"
              {...register("cardNumber", { required: true, minLength: 16, maxLength: 16 })}
            />
          </div>
          {errors.cardNumber && <p className="text-warning">please check cardNumber</p>}

          <div className="form-group mt-3">
            <label>EXPIRY</label>
            <input
              type="text"
              placeholder="MM/YYYY"
              className="form-control"
              {...register("expiry", { required: true, minLength: 7, maxLength: 7 })}
            />
          </div>
          {errors.expiry && <p className="text-warning">please check expiry</p>}

          <div className="form-group mt-3">
            <label>CVV</label>
            <input
              type="text"
              placeholder="CVV"
              className="form-control"
              {...register("cvv", { required: true, minLength: 3, maxLength: 3 })}
            />
          </div>
          {errors.cvv && <p className="text-warning">please check cvv</p>}
          <br></br>
          <button className='btn btn-dark btn-lg btn-block mt-3 mb-3' type='submit'>submit</button>
        </form>
      </Card.Body>
    </Card>
  </>
  );
};

export default Payment;

