import React from 'react'
import { Navigate , Outlet } from 'react-router'

const Protected = ({auth}) => {


 return auth !== null ? <Outlet /> : <Navigate to='/seller/auth/login' />

};

export default Protected