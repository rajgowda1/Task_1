import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useForm} from 'react-hook-form'
import{useState , useEffect} from 'react'
import {Link ,useNavigate} from "react-router-dom"
import axios from 'axios'
import { securePatch } from '../../services/HTTPservices';
import NavigationBar from '../NavigationBar';
import {post} from '../../services/HTTPservices'
import { toast ,Toaster } from 'react-hot-toast'

export default function SendVerifyEmail() 
{
  const tok= JSON.parse(localStorage.getItem('token'))
  const token='Bearer '+tok
  console.log(token)
  
    const sendEmail = () => {
      const url="/auth/send-verification-email?captcha=false"
  
     
  
      console.log("function")
      post(`${url}`,{headers:
        {
          Authorization:token
         }
        })
         .then((res)=>{
          console.log(res)
          toast.success("VERIFICATION SENT")
         })
         .catch((err)=>{
          console.log(err)
          toast.error(err.response.data.message)
         })
         console.log("after");  
    }

  
  

return (
  <div>
    <div><Toaster/></div>
    <button className='btn btn-dark btn-lg btn-block  mt-2 ' onClick={sendEmail} type='submit'>SEND VERIFY EMAIL</button>
         
    
  </div>
)
}
