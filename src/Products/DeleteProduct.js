import React from 'react'
import { deleteFun, securePatch } from '../services/HTTPservices';
import { useNavigate } from 'react-router-dom';
import { toast ,Toaster } from 'react-hot-toast'

function DeleteProduct(pid) 
{
const navigate=useNavigate();
const del = () => 
{
console.log("delete");
console.log(pid.pid);
const url=`/products/${pid.pid}`

deleteFun(url)
.then((res)=>{
    console.log(res);
    toast.success("PRODUCT DELETED SUCCESSFULLY")
    navigate("/seller/products")
})
.catch((err)=>{
    console.log(err);
    toast.error(err.response.data.message)
})




}


  return (<>
  <div><Toaster/></div>
    <div className="align-items-center justify-content-center"> 
        <h4>ARE YOU SURE</h4>
        <button className='btn btn-dark btn-lg btn-block mt-3 mb-3'  onClick={del}>DELETE</button>
        </div>
        </>
  )
}

export default DeleteProduct