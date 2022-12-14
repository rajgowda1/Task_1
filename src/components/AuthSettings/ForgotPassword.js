import React from 'react'
import {useForm} from 'react-hook-form'
import{useState , useEffect} from 'react'
import {Link ,useNavigate} from "react-router-dom"
import axios from 'axios'
import { toast ,Toaster } from 'react-hot-toast'
import { post } from '../../services/HTTPservices'
import { setToken } from '../../services/TokenServices'


function ForgotPassword() {
    const navigate= useNavigate();
    // const captcha= JSON.parse(localStorage.getItem("_grecaptcha"))
    const {register,handleSubmit,formState:{errors}}=useForm();
   const Url = `https://shop-api.ngminds.com/auth/forgot-password`
    
    const onSubmit=(data)=>{
        
        data.captcha=captchaToken;
        
      
      console.log(data)
    //   console.log(captcha);
       axios.post(Url, data)

   
       .then((response)=>
        {   console.log(response)   
            toast.success("RESET LINK SENT TO MAIL")
            
            // setToken(response.data.token)
            
            // (response.data.token && setAuth(response.data.token))
            // navigate("/my-profile")
            
        })
        .catch((error)=>
        {
            console.log(error)
            toast.error(error.response.data.message)
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
    <div><div><Toaster/></div>

        <form  onSubmit={handleSubmit(onSubmit)} className='text-center d-grid h-100 mt-5 ' id='form-log' >
            <h1 className='text-light'>FORGOT PASSWORD</h1>

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
            
        
            <br></br>
            <input type='checkbox' onClick={reCaptchaToken} /> <label> I am not a ROBOT</label>

            <button className='btn btn-dark btn-lg btn-block mt-3 mb-3' type='submit'>submit</button>
            <Link to="/auth/login" className='text-light'>Existing User ? LOGIN</Link>
          
        </form>
    </div>
    )
}

export default ForgotPassword