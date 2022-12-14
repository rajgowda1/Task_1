import axios from 'axios';
import React, { useState } from 'react'
import {useForm} from 'react-hook-form'
import { getToken } from '../services/TokenServices';
import { toast ,Toaster } from 'react-hot-toast'
// import axios from 'axios';
function AddProducts() {


    
    const formData=new FormData()

    const url='https://shop-api.ngminds.com/products'
    const {register,handleSubmit,formState:{errors}}=useForm();

    // const [images,setImages]=useState()

    const tok =getToken()
    const token = `Bearer ${tok}`


const onSubmit=(data)=>{

    console.log(data);
    
    for(let i=0;i<data.images.length;i++){
        formData.append("images",data.images[i])
    }
console.log("before");

    formData.append("name",data.name)
    formData.append("description",data.description)
    // formData.append("images",images)
    formData.append("price",data.price)
    console.log(formData)
    console.log(formData)



        axios.post(url,formData,
            {
                headers:{ 
                    Authorization: token ,
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
        .then((res)=>{
            console.log(res);
            toast.success("PRODUCT ADDED SUCCESSFULLY")
            window.location.reload(); 
        })
        .catch((err)=>{
            console.log(err);
            toast.error(err.response.data.message)
        })


}

  return (
    <div>
        <div><Toaster/></div>
 <form  onSubmit={handleSubmit(onSubmit)} className='text-center d-grid h-100' id='form-log' >
        

            <div className=" mt-3">
            <label>NAME</label>
            <input 
                type="text"
                placeholder="name"
                className="form-control"
                {...register("name",{required:true})}
                />
            </div>
            {errors.name && <p className="text-warning">please check name</p>}
            
            <div className=" mt-3 h-75"> <label>Description</label>
            <input 
                type="text"
                placeholder="Description"
                className="form-control h-75"
                {...register("description",{required:true})}
                />
            </div>
            {errors.description && <p className="text-warning">please check description</p>}
            <br></br>

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



          <div className=" mt-3"> <label>Price</label>
            <input 
                type="number"
                placeholder="price"
                className="form-control"
                {...register("price",{required:true})}
                />
            </div>
            {errors.description && <p className="text-warning">please enter price</p>}


            <button className='btn btn-dark btn-lg btn-block mt-3 mb-3' type='submit'>Add Product</button>
           
            

        </form>
    
    
    </div>
  )
}

export default AddProducts