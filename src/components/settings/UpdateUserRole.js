import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import { securePatch } from '../../services/HTTPservices';
import NavigationBar from '../../BasicFunctionalities/NavigationBar';
import { toast, Toaster } from 'react-hot-toast'

function UpdateUserRole(userData) {

  const navigate = useNavigate()
  const uid = userData.userRoleId._id
  const { register, handleSubmit, formState: { errors } } = useForm();
  const userInfoUrl = `/users/role/${uid}`
  const onSubmit = (data) => {
    console.log(uid)
    console.log(data);
    console.log(userInfoUrl)

    securePatch(userInfoUrl, data)
      .then((response) => {
        console.log(response);
        toast.success("UPDATED USER ROLE")
        window.location.reload();

      }).catch((error) => {
        console.log(error);
        toast.error(error.response.data.message)
      })

  }

  return (
    <div >
      <div><Toaster /></div>
      <form onSubmit={handleSubmit(onSubmit)} className='text-center d-grid h-100 mt-1 ' id='form-log' >
        <div className="form-group mt-1"> <label>ENTER ROLE</label>
          <input
            type="text"
            placeholder="Enter role (admin or user)"
            className="form-control"
            {...register("role", { required: true })}
          />
        </div>
        {errors.role && <p className="text-warning">please enter role</p>}
        <button className='btn btn-dark btn-lg btn-block mt-1 mb-1' type='submit'>SUBMIT</button>

      </form>


    </div>
  )
}

export default UpdateUserRole