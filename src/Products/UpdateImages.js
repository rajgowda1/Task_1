import React from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios';
import { getToken } from '../services/TokenServices';
import { toast, Toast,Toaster } from 'react-hot-toast';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { Vr } from 'react-bootstrap-icons';


function UpdateImages(pid) {

    const {register,handleSubmit,formState:{errors}}=useForm();
    const url=`https://shop-api.ngminds.com/products/images/${pid.pid}`
    console.log(pid);
    
    const formData=new FormData()

    const formDataDelete=new FormData()

    const [deleteArr,setDeleteArr]= useState([])  

    const tok =getToken
    const token = `Bearer ${tok}`

    const onSubmit = (data) =>{
        for(let i=0;i<data.images.length;i++){
            formData.append("images",data.images[i])
        }
      
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

            toast.success("UPDATED IMAGE SUCCESSFUL")
        })
        .catch((err)=>{
            console.log(err);
            toast.error(err.response.data.message)
        })

    }

    const deleteImage=()=>{
        console.log(deleteArr);

        formDataDelete.append('delete',deleteArr)
        console.log(formDataDelete);
        axios.patch(url,formDataDelete,
            {
                headers:{ 
                    Authorization: token ,
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
        .then((res)=>{
            console.log(res);       
            toast.success("UPDATED IMAGE SUCCESSFUL")

            window.location.reload(); 


        })
        .catch((err)=>{
            console.log(err);
            toast.error(err.response.data.message)
        })
    }


  return (
  <>
        <div> <Toaster/> </div>
        <form  onSubmit={handleSubmit(onSubmit)} className='text-center d-grid h-100' id='form-log' >

        <div className=" mt-3"> <label className="text-center"> Select Images</label><br></br>
            
            <input 
                type="file" multiple
                className="form-control text-center"
                onChange ={(event)=>{
                    console.log(event.target.files)
                    // setImages(()=>event.target.files)
                }}
               {...register("images",{required:true})} 
              
                />
        </div>
        {errors.file && <p className="text-warning">please select file   </p>}
        <button className='btn btn-dark btn-lg btn-block mt-3  form-control text-center' type='submit'>Add Image</button>
        </form>
        <hr/>


        <div className="deleteProductList d-flex">
            {pid?.currentImg.map((item)=>{

                const deleteArray=()=>{
                    deleteArr.push(item?.public_id)
                    console.log(deleteArr)
                   
                }
                // console.log(deleteArr);
                // console.log(item?.url);
                return(<>
                <div className='d-flex align-items-start'>
                    <img src={item?.url} style={{width:'100px'}}></img>
                    <Button variant="outline-danger" onClick={deleteArray}>X</Button>
                    
                    </div>
                    </>
                )
            })}
        </div>
        <button className='btn btn-danger btn-lg btn-block form-control text-center' onClick={deleteImage} >Delete Image</button>

  </>
  
  )
}

export default UpdateImages