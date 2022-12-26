import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { put, securePost } from '../../services/HTTPservices';

function UpdateAddress(addId) {
    const {register,handleSubmit,formState:{errors}}=useForm();
    const url=`/customers/address/${addId.addId._id}`
    console.log(url);
    console.log(addId);

    const onSubmit = (data) => {
        console.log(data);

        put(url,data)
        .then((res)=>{
            console.log(res);
            toast.success("ADDRESS UPDATED SUCCESSFULLY")
            window.location.reload();
        })
        .catch((err)=>{
            console.log(err);
            toast.error(err.response.data.message)
        })
    }
  return (
    <div><form  onSubmit={handleSubmit(onSubmit)} className='text-center d-grid h-100  ' id='form-log' >
       

    <div className="form-group mt-1">
  
  <input 
      type="text"
      defaultValue={addId.addId.street}
      className="form-control"
      {...register("street",{required:true,maxLength:10})}
      />

   </div>


  {errors.name && <p className="text-warning">please check street</p>} 
     
  <div className="form-group mt-1">
      <input 
      type="text"
      defaultValue={addId.addId.addressLine2}
      className="form-control mt-1"
      {...register("addressLine2",{required:true,maxLength:10})}
      />

    </div>


      {errors.name && <p className="text-warning">please check addressLine2</p>} 


      <div className="form-group mt-1">
      <input 
      type="text"
      defaultValue={addId.addId.city}
      className="form-control mt-1"
      {...register("city",{required:true,maxLength:10})}
      />
      </div>


      {errors.name && <p className="text-warning">please check City</p>} 

      <div className="form-group mt-1">

      <input 
      type="text"
      defaultValue={addId.addId.state}
      className="form-control mt-1"
      {...register("state",{required:true,maxLength:10})}
      />

      </div>


      {errors.name && <p className="text-warning">please check State</p>}                     

      <div className="form-group mt-1">
      <input 
      type="number"
      defaultValue={addId.addId.pin}
      className="form-control mt-1"
      {...register("pin",{required:true,maxLength:6})}
      />

      </div>

  
      {errors.name && <p className="text-warning">please check PIN</p>} 

        <button className='btn btn-dark btn-lg btn-block mt-1 mb-1' type='submit'>SUBMIT</button>
       
    </form></div>
  )
}

export default UpdateAddress