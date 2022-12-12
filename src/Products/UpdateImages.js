import React from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios';
import { getToken } from '../services/TokenServices';


function UpdateImages(pid) {

    const {register,handleSubmit,formState:{errors}}=useForm();
    const url=`https://shop-api.ngminds.com/products/images/${pid.pid}`
    const formData=new FormData()

    const tok =getToken
    const token = `Bearer ${tok}`

    const onSubmit = (data) =>{
        for(let i=0;i<data.images.length;i++){
            formData.append("images",data.images[i])
        }
        console.log("no see");
        axios.patch(url,formData,
            {
                headers:{ 
                    Authorization: token ,
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
        .then((res)=>{
            console.log(res);
            window.location.reload(); 
        })
        .catch((err)=>{
            console.log(err);
        })

    }

    


  return (
   
        <form  onSubmit={handleSubmit(onSubmit)} className='text-center d-grid h-100' id='form-log' >

        <div className=" mt-3"> <label>Select Images</label><br></br>
            
            <input 
                type="file" multiple
                onChange ={(event)=>{
                    console.log(event.target.files)
                    // setImages(()=>event.target.files)
                }}
                className='text-center' {...register("images",{required:true})} 
              
                />
        </div>
        {errors.file && <p className="text-warning">please select file   </p>}
        <button className='btn btn-dark btn-lg btn-block mt-3 mb-3' type='submit'>Add Product</button>
        </form>

  
  )
}

export default UpdateImages