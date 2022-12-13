import React from 'react'
import { useForm } from 'react-hook-form';
import { securePatch } from '../services/HTTPservices';

export default function UpdateProduct(pid) {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();    
      
      const onSubmit = (data) => {
        console.log(data,pid.pid);
    
        const url = `/products/${pid.pid}`
        
        console.log(url);
            securePatch(url,data)  
            .then((res)=>{
                console.log(res);
                window.location.reload();
            })
            .catch((err)=>{
                console.log(err);
            })}

  return (
   
    <div>
    <form onSubmit={handleSubmit(onSubmit)} className='text-center d-grid h-100' id='form-log'>
      <div className="form-control">
        <label>NAME</label>
        <input
          type="text"
          name="name"
          className="form-control"
          placeholder='name'
          {...register("name", {
            required: true
          })}
        />
      </div>
      <div className="form-control">
        <label>DESCRIPTION</label>
        <input
          type="text"
          name="description"
          className="form-control"
          placeholder='description'
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
          placeholder='price'
          className="form-control"
          {...register("price", {
            required: true
          })}
        />
      </div>

      <div className="form-control">
        <label></label>
        <button className='btn btn-dark btn-lg btn-block mt-3 mb-3' type='submit'>UPDATE</button>
      </div>
    </form>
  </div>
  )
}
