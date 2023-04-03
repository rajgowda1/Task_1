import React, { useState } from 'react'
import { Navigate , Outlet } from 'react-router-dom'


const ShopPublic = ({shopAuth}) => {
    const [customerLoggedIn, setShopAuth] = useState(JSON.parse(localStorage.getItem("customer-token")) || null)
    console.log(customerLoggedIn);

    return customerLoggedIn === null ? <Outlet /> : <Navigate to={"shop/customers/update-profile"}/>
}

export default ShopPublic