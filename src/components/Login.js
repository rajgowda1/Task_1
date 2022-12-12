import React from 'react'
import {useForm} from 'react-hook-form'
import{useState , useEffect} from 'react'
import {Link ,useNavigate} from "react-router-dom"
import axios from 'axios'

import { post } from '../services/HTTPservices'
import { setToken } from '../services/TokenServices'
import Alert from 'react-bootstrap/Alert';
import SocialLogin from './AuthSettings/SocialLogin'


function Login({setAuth}) {
    const navigate= useNavigate();
    const token = ''
    const {register,handleSubmit,formState:{errors}}=useForm();
    const loginUrl = `/auth/login`
    
    const onSubmit=(data)=>{
        

        data.captcha=captchaToken;
      console.log(data)
      post(loginUrl,data)

   
       .then((response)=>
        {   console.log(response)   
            
            setToken(response.data.token)
            
            (response.data.token && setAuth(response.data.token))

            
            
            navigate("/my-profile")
            
        })
        .catch((error)=>
        {
            console.log(error)
        }
       )
    }

    const [captchaToken,setCaptchaToken]=useState();
    
    const reCaptchaToken=()=>{

        window.grecaptcha.ready(function() {
            window.grecaptcha.execute('6LevmbQZAAAAAMSCjcpJmuCr4eIgmjxEI7bvbmRI', {action: 'submit'})
            .then(function(token) {
                // Add your logic to submit to your backend server here.
                console.log(token)
                setCaptchaToken(token)
            });
          });
    }


    return(
    <div>

        <form  onSubmit={handleSubmit(onSubmit)} className='text-center d-grid h-100 mt-5 ' id='form-log' >
            <h1 className='text-light'>LOG IN</h1>

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

            <input type='checkbox' onClick={reCaptchaToken} /><label> I am not a ROBOT</label>

            <button className='btn btn-dark btn-lg btn-block mt-3 mb-3' type='submit'>LOG IN</button>
           
            <Link  className='text-light' to='/'>Sign Up</Link> <Link  className='text-light' to='/auth/forgot-password'>Forgot Password ?</Link>

        </form>
        <SocialLogin />
    </div>
    )
}

export default Login