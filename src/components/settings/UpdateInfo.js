import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useForm} from 'react-hook-form'
import{useState , useEffect} from 'react'
import {Link ,useNavigate} from "react-router-dom"
import axios from 'axios'
import { securePatch } from '../../services/HTTPservices';
import NavigationBar from '../NavigationBar';

function UpdateInfo() {

    const navigate=useNavigate();
    const UpdateInfoUrl="/users/org"
    const tok= JSON.parse(localStorage.getItem('token'))
    const token='Bearer '+tok

    const {register,handleSubmit,formState:{errors}}=useForm();
    
    const onSubmit=(data)=>{
        console.log(data)

        securePatch(UpdateInfoUrl,data)
    //     axios.patch('https://ngminds.herokuapp.com/users/org',data,{ headers: {  Authorization:token}, }
    // )
    .then((response) => {
        console.log(response);
        navigate("/my-profile")
    })
    .catch((error) => {
        console.log(error);
    })

    
     }

    


  return (
    <div>
      
        <form  onSubmit={handleSubmit(onSubmit)} className='text-center d-grid h-100  ' id='form-log' >
           

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
            
            <div className="form-group mt-1"> <label>COMPANY     NAME</label>
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

export default UpdateInfo