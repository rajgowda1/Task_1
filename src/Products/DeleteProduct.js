import React from 'react'
import { deleteFun, securePatch } from '../services/HTTPservices';
import { useNavigate } from 'react-router-dom';

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
    navigate("/products")
})
.catch((err)=>{
    console.log(err);
})




}


  return (
    <div className="align-items-center justify-content-center"> 
        <h4>ARE YOU SURE</h4>
        <button className='btn btn-dark btn-lg btn-block mt-3 mb-3'  onClick={del}>DELETE</button>
        </div>
  )
}

export default DeleteProduct