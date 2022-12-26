import React from 'react'
import {useForm} from 'react-hook-form'
import{useState , useEffect} from 'react'
import {Link ,useNavigate} from "react-router-dom"
import axios from 'axios'

import { post } from '../services/HTTPservices'
import { setToken } from '../services/TokenServices'
import Alert from 'react-bootstrap/Alert';
import SocialLogin from '../components/AuthSettings/SocialLogin'
import { toast ,Toaster } from 'react-hot-toast';
import Shopping from './Shopping'


function ShopSignIn() {

    const navigate= useNavigate();

    const {register,handleSubmit,formState:{errors}}=useForm();
    const loginUrl = `/shop/auth/login`

    // const [captchaToken,setCaptchaToken]=useState();
    

    const onSubmit=(data)=>{
        
        // data.captcha=captchaToken;
      console.log(data)
      
     post(loginUrl,data)

   
       .then((response)=>
        {   console.log(response)   
            
            localStorage.setItem('customer-token',JSON.stringify(response.data.token))
            
            // (response.data.token && setAuth(response.data.token))

            
            toast.success("LOGIN SUCCESFUL")

            navigate("/")
            
        })
        .catch((error)=>
        {
            console.log(error)
            toast.error(error.response.data.message)
        }
       )
    }

  return (
    
    <div>
    <div><Toaster/></div>

    <form  onSubmit={handleSubmit(onSubmit)} className='text-center d-grid h-100 mt-5 ' id='form-log' >
        <h1 className='text-light'>SIGN IN</h1>

        <div className="form-group mt-3">
        <label>EMAIL</label>
        <input 
            type="email"
            placeholder="Email"
            className="form-control"
            {...register("email",{required:true,pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/})}
            />
        </div>
        {errors.email && <p className="text-warning">please check email</p>}
        
        <div className="form-group mt-3"> <label>PASSWORD</label>
        <input 
            type="password"
            placeholder="Password"
            className="form-control"
            {...register("password",{required:true})}
            />
        </div>
        {errors.password && <p className="text-warning">please check password</p>}
        <br></br>

        {/* <input type='checkbox' onClick={reCaptchaToken} /><label> I am not a ROBOT</label> */}

        <button className='btn btn-dark btn-lg btn-block mt-3 mb-3' type='submit'>SIGN IN</button>
       
        <Link  className='text-light' to='/shop/auth/register'>Sign Up</Link> 
        {/* <Link  className='text-light' to='/seller/auth/forgot-password'>Forgot Password ?</Link> */}

    </form>
    </div>
  )
}

export default ShopSignIn




    
    
  


    
    // const reCaptchaToken=()=>{

    //     window.grecaptcha.ready(function() {
    //         window.grecaptcha.execute('6LevmbQZAAAAAMSCjcpJmuCr4eIgmjxEI7bvbmRI', {action: 'submit'})
    //         .then(function(token) {
    //             // Add your logic to submit to your backend server here.
    //             console.log(token)
    //             setCaptchaToken(token)
    //         });
    //       });
    // }


