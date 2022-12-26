import React from 'react'
import { toast, Toast,Toaster } from 'react-hot-toast';
import {useForm} from 'react-hook-form'
import axios from 'axios';

function UpdateProfilePic() {

    const {register,handleSubmit,formState:{errors}}=useForm();
    const url=`https://shop-api.ngminds.com/customers/profile-picture`
    const token = JSON.parse(localStorage.getItem("customer-token"))

    const formData = new FormData()

    const onSubmit = (data) =>{
 
            formData.append("picture",data.image[0])     
      
        axios.post(url,formData,
            {
                headers:{ 
                    'Authorization': token ,
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
        .then((res)=>{
            console.log(res);
            window.location.reload(); 

            toast.success("UPDATED IMAGE SUCCESSFUL")
        })
        .catch((err)=>{
            console.log(err);
            toast.error(err.response.data.message)
        })

    }

  return (
    <div> <div> <Toaster/> </div>
        <form  onSubmit={handleSubmit(onSubmit)} className='text-center d-grid h-100' id='form-log' >

        <div className=" mt-3"> <label className="text-center"> Select Image</label><br></br>
            
            <input 
                type="file" 
                className="form-control text-center"
                onChange ={(event)=>{
                    console.log(event.target.files)
                    // setImages(()=>event.target.files)
                }}
               {...register("image",{required:true})} 
              
                />
        </div>
        {errors.file && <p className="text-warning">please select file   </p>}
        <button className='btn btn-dark btn-lg btn-block mt-3  form-control text-center' type='submit'>Add Image</button>
        </form>
        </div>
  )
}

export default UpdateProfilePic