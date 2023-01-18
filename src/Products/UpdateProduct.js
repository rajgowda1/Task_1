import React from 'react'
import { useForm } from 'react-hook-form';
import { securePatch } from '../services/HTTPservices';
import { toast ,Toaster } from 'react-hot-toast'

export default function UpdateProduct(pid) {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();   
      console.log(pid); 
      
      const onSubmit = (data) => {
        console.log(data,pid.pid);
        const url = `/products/${pid.pid}`
        console.log(url);
            securePatch(url,data)  
            .then((res)=>{
                console.log(res);
                toast.success("PRODUCT UPDATED SUCCESSFULLY")
                window.location.reload();
            })
            .catch((err)=>{
                console.log(err);
                toast.error(err.response.data.message)
            })}
  return (
   
    <div>
      <div><Toaster /></div>
    <form onSubmit={handleSubmit(onSubmit)} className='text-center d-grid h-100' id='form-log'>
      <div className="form-control">
        <label>NAME</label>
        <input
          type="text"
          name="name"
          className="form-control"
          defaultValue={pid?.productData.name}
          {...register("name", {
            required: true
          })}
        />
      </div>
      <div className="form-control">
        <label>DESCRIPTION</label>
        <textarea
          type="text"
          name="description"
         defaultValue={pid?.productData.description}
          className="form-control"
          
          {...register("description", {
            required: true
          })
        }
        />
      </div>
      <div className="form-control">
        <label>PRICE</label>
        <input
          type="number"
          name="price"
          defaultValue={pid?.productData.price}          
          className="form-control"
          {...register("price", {
            required: true
          })}
        />
      </div>

      <div >
        <label></label>
        <button className='btn btn-dark btn-lg btn-block mt-3 mb-3' type='submit'>UPDATE</button>
      </div>
    </form>
  </div>
  )
}
