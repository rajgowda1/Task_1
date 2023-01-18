import React from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { securePost } from '../../services/HTTPservices';

function AddNewAdd() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const url = "/customers/address"

  const onSubmit = (data) => {
    console.log(data);

    securePost(url, data)
      .then((res) => {
        console.log(res);
        toast.success("ADDRESS ADDED SUCCESSFULLY")
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message)
      })
  }
  return (
    <div> <div>

      <form onSubmit={handleSubmit(onSubmit)} className='text-center d-grid h-100  ' id='form-log' >
        <div className="form-group mt-1">
          <input
            type="text"
            placeholder="Enter Street Address"
            className="form-control"
            {...register("street", { required: true })}
          />
        </div>

        {errors.name && <p className="text-warning">please check street</p>}

        <div className="form-group mt-1">
          <input
            type="text"
            placeholder="Enter AddressLine2"
            className="form-control mt-1"
            {...register("addressLine2", { required: true })}
          />

        </div>
        {errors.addressLine2 && <p className="text-warning">please check addressLine2</p>}


        <div className="form-group mt-1">
          <input
            type="text"
            placeholder="Enter City"
            className="form-control mt-1"
            {...register("city", { required: true })}
          />
        </div>
        {errors.city && <p className="text-warning">please check City</p>}


        <div className="form-group mt-1">
          <input
            type="text"
            placeholder="Enter State "
            className="form-control mt-1"
            {...register("state", { required: true })}
          />
        </div>
        {errors.state && <p className="text-warning">please check State</p>}


        <div className="form-group mt-1">
          <input
            type="number"
            placeholder="Enter PIN"
            className="form-control mt-1"
            {...register("pin", { required: true, maxLength: 6 })}
          />
        </div>
        {errors.pin && <p className="text-warning">please check PIN</p>}

        <button className='btn btn-dark btn-lg btn-block mt-1 mb-1' type='submit'>SUBMIT</button>

      </form>
    </div></div>
  )
}

export default AddNewAdd