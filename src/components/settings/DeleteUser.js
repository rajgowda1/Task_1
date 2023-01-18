import React from 'react'
import { useNavigate } from 'react-router-dom';
import { deleteFun } from '../../services/HTTPservices';
import { toast, Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';


function DeleteUser(delId) {
  const navigate = useNavigate()
  const uid = delId.delId._id
  const deleteUser = `/users/${uid}`
  const logout = () => {

    console.log(deleteUser);
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
        deleteFun(deleteUser)
        .then((response) => {
          console.log(response);
          console.log("user deleted ")
          toast.success("USER DELETED")
          window.location.reload();
  
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response.data.message)
        });
      }
    })
  }
  return (
    <div className='deleteContainer'>
      <div><Toaster /></div>

      <div className="card text-white bg-dark " >
        <div className="card-header">DELETE USER</div>
        <div className="card-body">
          <img className='image'
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZTWhT_VCIRHy7zaEqGgQeH0THZfahCIwf6fX45pSrYuJXw7f3xQV1-n5YkvAYbiapGWU&usqp=CAU"
            alt="new"
          />
          <h3>are you sure you <br />want to DELETE ???</h3>
          <button onClick={logout}
            className='btn btn-danger'>YES</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteUser