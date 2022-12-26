import React from 'react'
import { deleteFun } from '../../services/HTTPservices'

function DeleteCustomer() {
    const delUrl="/customers/account"
    const deleteCust = () => {
        deleteFun(delUrl)
        .then((res)=>{
            console.log(res);
        })
        .catch((err)=>{
            console.log(err);
        })
    }
  return (
    <div> 
    <button onClick={deleteCust}
        className='btn btn-danger w-25'>YES</button></div>
  )
}

export default DeleteCustomer