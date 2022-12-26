import React from 'react'
import {useForm} from 'react-hook-form'
import {useNavigate} from "react-router-dom"
import { securePost } from '../../services/HTTPservices';
import { toast ,Toaster } from 'react-hot-toast'


export default function     ChangeCustomerPassword() {

  const navigate=useNavigate();
  

 
  

  const {register,handleSubmit,formState:{errors}}=useForm();
  const userInfoUrl=`/customers/auth/change-password`
  
  
  const onSubmit=(data)=>{
      console.log(data)
      console.log(userInfoUrl)
    securePost(userInfoUrl,data)
      .then((response) => {
      console.log(response);
      toast.success("SUCCUSSFULLY CHANGED PASSWORD")
      window.location.reload();
  }).catch((error) => {
      console.log(error);
      toast.error(error.response.data.message)
  })
  }
  return (

    <div>
      <div><Toaster/></div>
      <form  onSubmit={handleSubmit(onSubmit)} className='text-center d-grid  mt-1 text-light  ' id='form-log' >

        <div className='mt-1'> <label>OLD PASSWORD</label>
          <input 
              type="password"
              placeholder="Old Password"
              className="form-control"
              {...register("old_password",{required:true})}
              />
          </div>
          {errors.password && <p className="text-warning">please check password</p>}
        
          <div className='mt-1'> <label>NEW PASSWORD</label>
          <input 
              type="password"
              placeholder="New Password"
              className="form-control"
              {...register("new_password",{required:true})}
              />
          </div>
          {errors.password && <p className="text-warning">please check password</p>}
        <button className='btn btn-dark btn-lg btn-block  mt-3' type='submit'>CHANGE PASSWORD</button>
       
    </form></div>
  )
}

