import React from 'react'
import { toast ,Toaster } from 'react-hot-toast';

import {useForm} from 'react-hook-form'
import { securePatch } from '../../services/HTTPservices';



function UpdateCustProfile() {


    const {register,handleSubmit,formState:{errors}}=useForm();
    const url="/customers/update-profile"

    const onSubmit = (data) => {
        console.log(data);
        
        securePatch(url,data)
        .then((res)=>{
            console.log(res);
            window.location.reload();
            toast.success("PROFILE UPDATED")

        })
        .catch((err)=>{
            console.log(err);
            toast.error(err.response.data.message)
        })


    }

  return (
    <div>


    <div><Toaster/></div>

        <form  onSubmit={handleSubmit(onSubmit)} className='text-center d-grid h-100  ' id='form-log' >
          

            <div className="form-group ">
                <label className='text-dark'>EMAIL</label>
                <input 
                    type="email"
                    placeholder="Email"
                    className="form-control"
                    {...register("email",{required:true,pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/})}
                   
                    />
            </div>
                    {errors.email && <p className="text-warning">please check email</p>}
            
            <div className="form-group mt-3"> <label className='text-dark'>NAME</label>
                <input 
                    type="text"
                    placeholder="Name"
                    className="form-control"
                    {...register("name",{required:true})}

                    />
            </div>
            {errors.name && <p className="text-warning">please check name</p>}
            
            <button className='btn btn-dark btn-lg btn-block mt-3 ' type='submit'>UPDATE</button>
        </form>

    </div>


  )
}

export default UpdateCustProfile