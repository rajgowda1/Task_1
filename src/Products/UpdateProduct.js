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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-control">
        <label>Name</label>
        <input
          type="text"
          name="name"
          {...register("name", {
            required: true
          })}
        />
      </div>
      <div className="form-control">
        <label>Description</label>
        <input
          type="text"
          name="description"
          {...register("description", {
            required: true
          })
        }
        />
      </div>
      <div className="form-control">
        <label>Price</label>
        <input
          type="number"
          name="price"
          {...register("price", {
            required: true
          })}
        />
      </div>

      <div className="form-control">
        <label></label>
        <button type="submit">Login</button>
      </div>
    </form>
  </div>
  )
}
