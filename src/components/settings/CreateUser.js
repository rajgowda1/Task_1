import React from 'react'
import {useForm} from 'react-hook-form'
import{useState , useEffect} from 'react'
import { useNavigate , Link } from 'react-router-dom';

import axios from 'axios'
import { securePost } from '../../services/HTTPservices';
import NavigationBar from '../NavigationBar';
import { toast ,Toaster } from 'react-hot-toast';

function CreateUser() {
  
    const {register,handleSubmit,formState:{errors}}=useForm();
const navigate= useNavigate();

const tok= JSON.parse(localStorage.getItem('token'))
const token='Bearer '+tok
// const 
// const [userData,setuserData]=useState([])

const createUserUrl="/users"

const onSubmit=(data)=>{
        
     console.log(data)
     
    
    securePost(createUserUrl,data)
    // axios.post('https://ngminds.herokuapp.com/users',data,
    //     {headers:{
    //         Authorization:token
    //     }}   
    // )

    .then((response) => {
        console.log(response);
        toast.success("USER CREATED")
        navigate('/my-profile')
        

    })
    .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message)
    })
    }
    

    return (<>
        
    <div>
    <div><Toaster/></div>

        <form  onSubmit={handleSubmit(onSubmit)}  className='text-center d-grid h-100 mt- ' id="form-log">
          

            <div className="form-group  mt-1">
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

            <div className="form-group mt-1">
            <label>NAME</label>
            <input 
                type="text"
                placeholder="enter Name"
                className="form-control"
                {...register("name",{required:true,maxLength:10})}
                />
            </div>
            {errors.name && <p className="text-warning">please check name</p>}

            <div className="form-group  mt-1">
            <label>ROLE</label>
            <input 
                type="text"
                placeholder="Enter Role"
                className="form-control"
                {...register("role",{required:true,maxLength:12})}
                />
            </div>
            {errors.companyName && <p className="text-warning"> please check Company Name</p>}

            <button className='btn btn-dark btn-lg btn-block  mt-1' type='submit'>ADD</button>
           
        
        
        </form>

    </div>
    </>
  )
  
}

export default CreateUser