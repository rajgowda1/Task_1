import React from 'react'
import { Navigate , Outlet } from 'react-router-dom'

const ShopPublic = ({shopAuth}) => {
    return shopAuth === null ? <Outlet /> : <Navigate to={"shop/customers/update-profile"}/>
}

export default ShopPublic