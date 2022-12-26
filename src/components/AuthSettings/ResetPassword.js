import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useForm} from 'react-hook-form'
import{useState , useEffect} from 'react'
import {Link ,useNavigate, useSearchParams} from "react-router-dom"
import axios from 'axios'
import { securePatch, securePost } from '../../services/HTTPservices';
import NavigationBar from  '../../BasicFunctionalities/NavigationBar';
import { Routes, Route, useParams } from 'react-router-dom';
import { toast ,Toaster } from 'react-hot-toast'


export default function ResetPassword() {
  const navigate=useNavigate();
  const tok= JSON.parse(localStorage.getItem('token'))

  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get('token'))

  const token=searchParams.get('token')

  const {register,handleSubmit,formState:{errors}}=useForm();

  const Url=`/auth/reset-password?token=${token}`
  // const captcha = JSON.parse(localStorage.getItem("_grecaptcha"))


  const onSubmit=(data)=> {
      console.log(data)
      console.log(Url)

      // data.token=tok
      // data.captcha=captcha
      console.log(data)
    securePost(Url,data)
      .then((response) => {
      console.log(response);
      toast.success("PASSWORD RESET SUCCESS")

      navigate("/seller/my-profile")
  }).catch((error) => {
      console.log(error);
      toast.error(error.response.data.message)
  })

  
   }

  


return (
  <div>
    <div><Toaster/></div>
    
      <form  onSubmit={handleSubmit(onSubmit)} className='text-center d-grid text-light  ' id='form-log' >
        
            <div className='mt-3'> <label>NEW PASSWORD</label>
            <input 
                type="password"
                placeholder="New Password"
                className="form-control"
                {...register("password",{required:true})}
                />
            </div>
            {errors.password && <p className="text-warning">please check password</p>}
          

          


          <button className='btn btn-dark btn-lg btn-block  mt-3' type='submit'>RESET PASSWORD</button>
         
      </form>
  </div>
)
}
