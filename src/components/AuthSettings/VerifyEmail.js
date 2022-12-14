import axios from 'axios';
import React from 'react'
import {Link ,useNavigate, useSearchParams} from "react-router-dom"
import { post } from '../../services/HTTPservices';
import { toast ,Toaster } from 'react-hot-toast'




function VerifyEmail() {

  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get('token'))

  const token=searchParams.get('token')
    console.log(token);
    const verify=()=>{
    console.log("veify ");
    const url=`/auth/verify-email?token=${token}`


    post(url)
    .then((response)=>
    {console.log(response)})
    toast.success("VERIFICATION SUCCESSFUL")

    .catch((error)=>{
      console.log(error);
      toast.error(error.response.data.message)
    })


    }
  return (<>
    <div><Toaster/></div>
    <div> <button className='btn btn-dark btn-lg btn-block  mt-2' onClick={verify} type='submit'>VERIFY EMAIL</button></div>
    </>
  )
}

export default VerifyEmail
