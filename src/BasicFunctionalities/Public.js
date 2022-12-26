import React from 'react'
import { Navigate , Outlet } from 'react-router'

const Public = ({auth}) => {


 return auth ===null ? <Outlet /> : <Navigate to='/seller/my-profile' />

};

export default Public