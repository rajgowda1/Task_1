import React from 'react'
import {useForm} from 'react-hook-form'
import {useNavigate} from "react-router-dom"
import { securePost } from '../../services/HTTPservices';
import NavigationBar from '../NavigationBar';
import { toast ,Toaster } from 'react-hot-toast'

export default function ChangePassword() {
  const navigate=useNavigate();
  const tok= JSON.parse(localStorage.getItem('token'))

  const uid= JSON.parse(localStorage.getItem('uid'))
  const token='Bearer '+tok
  const userId=""
  const {register,handleSubmit,formState:{errors}}=useForm();
  const userInfoUrl=`/user s/auth/change-password`
  
  
  const onSubmit=(data)=>{
      console.log(data)
      console.log(userInfoUrl)
    securePost(userInfoUrl,data)
      .then((response) => {
      console.log(response);
      toast.success("SUCCUSSFULLY CHANGED PASSWORD")
      navigate("/my-profile")
  }).catch((error) => {
      console.log(error);
      toast.error(error.response.data.message)
  }
  )
}
return (
  <div><div><Toaster/></div>
   <NavigationBar />

      
      <form  onSubmit={handleSubmit(onSubmit)} className='text-center d-grid  mt-5 text-light  ' id='form-log' >

      <h1 className='text-light mt-5'>CHANGE PASSWORD</h1>

          <div className='mt-1'> <label>OLD PASSWORD</label>
            <input 
                type="password"
                placeholder="Old Password"
                className="form-control"
                {...register("old_password",{required:true})}
                />
            </div>
            {errors.password && <p className="text-warning">please check password</p>}
          
            <div className='mt-3'> <label>NEW PASSWORD</label>
            <input 
                type="password"
                placeholder="New Password"
                className="form-control"
                {...register("new_password",{required:true})}
                />
            </div>
            {errors.password && <p className="text-warning">please check password</p>}
          <button className='btn btn-dark btn-lg btn-block  mt-3' type='submit'>CHANGE PASSWORD</button>
         
      </form>
  </div>
)
}
