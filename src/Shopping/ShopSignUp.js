import React from 'react'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { post } from '../services/HTTPservices';
import { toast, Toaster } from 'react-hot-toast';
import axios from 'axios'

function ShopSignUp() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const url = "/shop/auth/register"
    const onSubmit = (data) => {
        // data.captcha=captcha  
        console.log(data)

        const realData = {
            email: data.email,
            password: data.password,
            name: data.name,
            address: {
                street: data.street,
                addressLine2: data.addressLine2,
                city: data.city,
                state: data.city,
                pin: data.pin
            }
        }

        console.log(realData);
        post(url, realData)
            .then((res) => {
                console.log(res);
                navigate("/shopSignUp")
                toast.success("REGISTRATION SUCCESSFUL")
            })
            .catch((err) => {
                console.log(err);
                toast.error(err.response.data.message)
            })
    }


    return (
        <div >
            <div><Toaster /></div>

            <form onSubmit={handleSubmit(onSubmit)} className='text-center d-grid h-100 mt-5 ' id="form-log">
                <h1 className='text-light'>SIGN UP</h1>

                <div className="form-group  mt-3">
                    <label>EMAIL</label>
                    <input
                        type="email"
                        placeholder="Email"
                        className="form-control"
                        {...register("email", { required: true, pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}
                    />
                </div>
                {errors.email && <p className="text-warning">please check email</p>}

                <div className="form-group  mt-3"> <label>PASSWORD</label>
                    <input
                        type="password"
                        placeholder="Password"
                        className="form-control"
                        {...register("password", { required: true })}
                    />
                </div>

                {errors.password && <p className="text-warning">please check password</p>}


                <div className="form-group mt-3">
                    <label>NAME</label>
                    <input
                        type="text"
                        placeholder="Name"
                        className="form-control"
                        {...register("name", { required: true, maxLength: 10 })}
                    />  
                </div>
                {errors.name && <p className="text-warning">please check name</p>}

                <h4 className='text-light mt-3'>ADDRESS</h4>
                <div className="form-group mt-1">

                    <input
                        type="text"
                        placeholder="Enter Street Address"
                        className="form-control"
                        {...register("street", { required: true, maxLength: 10 })}
                    />

                </div>

                {errors.name && <p className="text-warning">please check street</p>}

                <div className="form-group mt-1">
                    <input
                        type="text"
                        placeholder="Enter AddressLine2"
                        className="form-control mt-1"
                        {...register("addressLine2", { required: true, maxLength: 10 })}
                    />

                </div>

                {errors.name && <p className="text-warning">please check addressLine2</p>}

                <div className="form-group mt-1">
                    <input
                        type="text"
                        placeholder="Enter City"
                        className="form-control mt-1"
                        {...register("city", { required: true, maxLength: 10 })}
                    />
                </div>

                {errors.name && <p className="text-warning">please check City</p>}

                <div className="form-group mt-1">

                    <input
                        type="text"
                        placeholder="Enter State "
                        className="form-control mt-1"
                        {...register("state", { required: true, maxLength: 10 })}
                    />

                </div>


                {errors.name && <p className="text-warning">please check State</p>}

                <div className="form-group mt-1">
                    <input
                        type="number"
                        placeholder="Enter PIN"
                        className="form-control mt-1"
                        {...register("pin", { required: true, maxLength: 6 })}
                    />

                </div>


                {errors.name && <p className="text-warning">please check PIN</p>}

                <br></br>

                <button className='btn btn-dark btn-lg btn-block  mt-3' type='submit'>SIGN UP</button><br />

                <Link to="/shop/auth/login" className='text-light'>Existing User ? LOGIN</Link>
                <Link className='text-light' to='/'>Shopping </Link>
            </form>
        </div>
    )
}

export default ShopSignUp

