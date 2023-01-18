import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ShopProtected = ({shopAuth}) => {
    return shopAuth !== null ? <Outlet/> : <Navigate to="shop/auth/login" />
}
export default ShopProtected