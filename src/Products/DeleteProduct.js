import React from 'react'
import { deleteFun, securePatch } from '../services/HTTPservices';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast'
import Swal from 'sweetalert2';

function DeleteProduct(pid) {
  const navigate = useNavigate();
  const del = () => {
    console.log("delete");
    console.log(pid.pid);
    const url = `/products/${pid.pid}`

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        deleteFun(url)
          .then((res) => {
            console.log(res);
            toast.success("PRODUCT DELETED SUCCESSFULLY")
            navigate("/seller/products")
          })
          .catch((err) => {
            console.log(err);
            toast.error(err.response.data.message)
          })

      }
    })




  }


  return (<>
    <div><Toaster /></div>
    <div className="align-items-center justify-content-center">
      <h4>ARE YOU SURE</h4>
      <button className='btn btn-dark btn-lg btn-block mt-3 mb-3' onClick={del}>DELETE</button>
    </div>
  </>
  )
}

export default DeleteProduct