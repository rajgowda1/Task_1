import React from 'react'
import { useNavigate } from 'react-router-dom';
import { deleteFun } from '../../services/HTTPservices';


function DeleteUser(delId) {
  const navigate = useNavigate()
  const uid= delId.delId._id
  const deleteUser=`/users/${uid}`
    const logout=()=>{
  
console.log(deleteUser);

       deleteFun(deleteUser)
      .then((response)=>{
        console.log(response);
        console.log("user deleted ")
        window.location.reload();
       
          })
      .catch((error)=>{
        console.log(error);
      });
      


    }


  return (
    <div className='deleteContainer'> 
   
    

        <div className="card text-white bg-dark " >
  <div className="card-header">DELETE USER</div>
  <div className="card-body">
  <img className='image'
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZTWhT_VCIRHy7zaEqGgQeH0THZfahCIwf6fX45pSrYuJXw7f3xQV1-n5YkvAYbiapGWU&usqp=CAU"
      alt="new"
      />
    <h3>are you sure you <br/>want to DELETE ???</h3>
 
        <button onClick={logout}
        className='btn btn-danger'>YES</button>
        

        
  </div>
</div>
  </div>
  )
}

export default DeleteUser