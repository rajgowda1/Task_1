import React, { useState } from 'react'
import { toast, Toast, Toaster } from 'react-hot-toast';
import { useForm } from 'react-hook-form'
import axios from 'axios';
import ImgCropper from './ImgCropper';

function UpdateProfilePic() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const url = `https://shop-api.ngminds.com/customers/profile-picture`
    const token = JSON.parse(localStorage.getItem("customer-token"))
    const [blob, setBlob] = useState();

    const formData = new FormData()

    const onSubmit = (data) => {

        formData.append("picture", blob)

        axios.post(url, formData,
            {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
            .then((res) => {
                console.log(res);
                window.location.reload();

                toast.success("UPDATED IMAGE SUCCESSFUL")
            })
            .catch((err) => {
                console.log(err);
                toast.error(err.response.data.message)
            })

    }

    return (
        <div> <div> <Toaster /> </div>
            <form onSubmit={handleSubmit(onSubmit)} className='text-center d-grid h-100' id='form-log' >

                <div className=" mt-3"> <label className="text-center"> Select Image</label><br></br>

                    <ImgCropper setBlob={setBlob} />

                </div>

                <button className='btn btn-dark btn-lg btn-block mt-3  form-control text-center' type='submit'>Add Image</button>
            </form>
        </div>
    )
}

export default UpdateProfilePic