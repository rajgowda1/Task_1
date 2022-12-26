import React from 'react'
import {useForm} from 'react-hook-form'
import{useState , useEffect} from 'react'
import { useNavigate , Link } from 'react-router-dom';
import { post } from '../services/HTTPservices';
import { toast ,Toaster } from 'react-hot-toast';
import axios from 'axios'


function Registration() {

const {register,handleSubmit,formState:{errors}}=useForm();
const navigate= useNavigate();
const url="/auth/register"
const[captcha,setCaptcha]=useState()
// const [userData,setuserData]=useState([])

const onSubmit=(data)=>{
    data.captcha=captcha  
     console.log(data)
     
     post(url,data)

    // axios.post(url,data)

    .then((response)=>{
        console.log(response);
        // console.log(response.data.token)
        // // const res=response.data.token;
        toast.success("REGISTRATION SUCCESSFUL")
        (response.data.token && navigate("seller/auth/login"))
        

    },(error)=>{
        console.log(error);
        toast.error(error.response.data.message)
    }
    )
    
}
    const reCaptcha=()=>{
        window.grecaptcha.ready(function() {
        window.grecaptcha.execute('6LevmbQZAAAAAMSCjcpJmuCr4eIgmjxEI7bvbmRI', {action: 'submit'})
        .then(function(token) {
            // Add your logic to submit to your backend server here.
        setCaptcha(token)
        console.log(captcha);
  });
      })
}
    return (
    <div >
<div><Toaster/></div>

        <form  onSubmit={handleSubmit(onSubmit)}  className='text-center d-grid h-100 mt-5 ' id="form-log">
            <h1 className='text-light'>REGISTER</h1>

            <div className="form-group  mt-3">
            <label>EMAIL</label>
            <input 
                type="email"
                placeholder="Email"
                className="form-control"
                {...register("email",{required:true,pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/})}
                />
            </div>
            {errors.email && <p className="text-warning">please check email</p>}

            <div className="form-group  mt-3"> <label>PASSWORD</label>
            <input 
                type="password"
                placeholder="Password"
                className="form-control"
                {...register("password",{required:true})}
                />
            </div>
            
            {errors.password && <p className="text-warning">please check password</p>}


            <div className="form-group mt-3">
            <label>NAME</label>
            <input 
                type="text"
                placeholder="Name"
                className="form-control"
                {...register("name",{required:true,maxLength:10})}
                />
            </div>
            {errors.name && <p className="text-warning">please check name</p>}
            
            <div className="form-group  mt-3">
            <label>COMPANY NAME</label>
            <input 
                type="text"
                placeholder="Company Name"
                className="form-control"
                {...register("company",{required:true,maxLength:12})}
                />
            </div>
            {errors.company && <p className="text-warning"> please check Company Name</p>}
            
            <br></br>
            <input type="checkbox" onClick={reCaptcha}/>
            <label > I am not ROBOT</label>
           
            <button className='btn btn-dark btn-lg btn-block  mt-3' type='submit'>SIGN UP</button><br/>
           
        
        <Link to="/seller/auth/login" className='text-light'>Existing User ? LOGIN</Link>
   
        </form>

    </div>
  )
}

export default Registration