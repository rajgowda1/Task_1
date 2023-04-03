import React, { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const customerLoggedIn = localStorage.getItem("customer-token") || null

const ShopProtected = ({shopAuth}) => {

    const [customerLoggedIn, setShopAuth] = useState(JSON.parse(localStorage.getItem("customer-token")) || null)
    console.log(customerLoggedIn);
    
    return customerLoggedIn !== null ? <Outlet/> : <Navigate to="shop/auth/login" />
}
export default ShopProtected