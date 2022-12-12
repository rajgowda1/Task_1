import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useForm} from 'react-hook-form'
import{useState , useEffect} from 'react'
import {Link ,useNavigate} from "react-router-dom"
import axios from 'axios'
import { securePatch } from '../../services/HTTPservices';
import NavigationBar from '../NavigationBar';

export default function UpdateUserInfo(userData) {
  const navigate=useNavigate();

 const uid=userData.userInfoId._id

 

  const {register,handleSubmit,formState:{errors}}=useForm();
  const userInfoUrl=`/users/${uid}`
  
  const onSubmit=(data)=>{
      console.log(uid)
      console.log(userInfoUrl)
    securePatch(userInfoUrl,data)
      .then((response) => {
      console.log(response);
      window.location.reload();
  }).catch((error) => {
      console.log(error);
  })


  
   }

  


return (
  <div>
  
      <form  onSubmit={handleSubmit(onSubmit)} className='text-center d-grid h-100 mt-1 ' id='form-log' >
        

          <div className="form-group mt-1">
          <label>EMAIL</label>
          <input 
              type="email"
              placeholder="Email"
              className="form-control"
              {...register("email",{required:true,pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/})}
              />
          </div>
          {errors.email && <p className="text-warning">please check email</p>}

          <div className="form-group  mt-1"> <label>PASSWORD</label>
            <input 
                type="password"
                placeholder="Password"
                className="form-control"
                {...register("password",{required:true})}
                />
            </div>
            {errors.password && <p className="text-warning">please check password</p>}
          
          <div className="form-group mt-1"> <label>NAME</label>
          <input 
              type="text"
              placeholder="Enter name"
              className="form-control"
              {...register("name",{required:true})}
              />
          </div>
          {errors.name && <p className="text-warning">please check name</p>}

          


          <button className='btn btn-dark btn-lg btn-block mt-1 mb-1' type='submit'>SUBMIT</button>
         
      </form>
  </div>
)
}
