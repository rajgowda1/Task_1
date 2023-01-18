import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import HTTPcalls, { secureGet } from '../services/HTTPservices'
import { remToken, TokenServices } from '../services/TokenServices';
import NavigationBar from './NavigationBar';
import { EnvelopeFill, PersonCircle, HouseDoorFill, FlagFill, PersonBadgeFill, PersonBadge, BoxArrowLeft, DoorClosedFill, HandThumbsUpFill } from 'react-bootstrap-icons'



function MyProfile({ setAuth }) {
  const navigate = useNavigate();
  const profileUrl = '/auth/self'
  const tok = JSON.parse(localStorage.getItem('token'))
  const token = 'Bearer ' + tok
  const [user, setUser] = useState()
  const verified = (user?.isEmailVerified ? "VERIFIED ✔️" : "Not VERIFIED ❌")

  useEffect(() => {

    secureGet(profileUrl, token)
      .then((response) => {
        setUser(response.data)
        const uid = response.data._id
        localStorage.setItem("uid", JSON.stringify(uid))
        console.log(response.data._id)
      })
      .catch((error) => {
        console.log(error);
      })

  }, [])
  const logout = () => {
    // setAuth=null;
    remToken()
    setAuth(null)
    navigate("/seller/auth/login");
  }
  return (<>
    <NavigationBar />
    <br />
    <div className='containerOuter'>
      <div className="card text-white bg-dark mb-3" >
        <div className="card-header"><PersonBadgeFill color='white' size={25} />USER DETAILS</div>
        <div className="card-body">
          <img className='image'
            src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
            alt="new"
          />

          <h3><PersonCircle color='white' />   Name : {user?.name} </h3>

          <h3><HouseDoorFill color='white' />   Company Name : {user?._org.name} </h3>
          <h3><EnvelopeFill color='white' />   Email : {user?.email} </h3>
          <h3><FlagFill color='white' />  Role : {user?.role} </h3>
          <h3><HandThumbsUpFill color='white' /> Verified : {verified} </h3>
          <button onClick={logout}
            className='btn btn-light mt-5'><DoorClosedFill color='black' size={35} />LOGOUT</button><br />
        </div>
      </div>
    </div>
  </>
  )
}

export default MyProfile