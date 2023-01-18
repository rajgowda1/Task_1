import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Registration from "./BasicFunctionalities/Registration"
import Login from "./BasicFunctionalities/Login"
import MyProfile from "./BasicFunctionalities/MyProfile"
import { useState, useEffect } from 'react'
import ProtectedRoutes from './BasicFunctionalities/Protected';
import Public from './BasicFunctionalities/Public'
import 'bootstrap/dist/css/bootstrap.min.css';
import UpdateInfo from './components/settings/UpdateInfo';
import ListOfUsers from './components/settings/ListOfUsers';
import CreateUser from './components/settings/CreateUser';
import UpdateUserInfo from './components/settings/UpdateUserInfo';
import UpdateUserRole from './components/settings/UpdateUserRole';
import DeleteUser from './components/settings/DeleteUser';
import Demo from './components/AuthSettings/Demo';
import ChangePassword from './components/AuthSettings/ChangePassword';
import ForgotPassword from './components/AuthSettings/ForgotPassword';
import ResetPassword from './components/AuthSettings/ResetPassword';
import VerifyEmail from './components/AuthSettings/VerifyEmail';
import 'react-toastify/dist/ReactToastify.css';
import HomeProducts from './Products/HomeProducts';
import Product from './Products/Product';
import Shopping from './Shopping/Shopping';
import ShopSignUp from './Shopping/ShopSignUp';
import ShopSignIn from './Shopping/ShopSignIn';
import CustomerProfile from './Shopping/CustomerProfile';
import Cart from './Shopping/Cart';
import Orders from "./Shopping/Orders"
import Payment from './Shopping/Payment';
import OrderDetails from './Shopping/OrderHistory';
import OrderHistory from './Shopping/OrderHistory';
import SingleBuy from './Shopping/SingleBuy';
import ShopProtected from './Shopping/Settings/RoutesProtection/ShopProtected';
import ShopPublic from './Shopping/Settings/RoutesProtection/ShopPublic';

function App() {

  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("token")) || null)

  useEffect(() => {
    setAuth(JSON.parse(localStorage.getItem("token")))
  }, [])

  const [shopAuth, setShopAuth] = useState(JSON.parse(localStorage.getItem("customer-token")) || null)

  useEffect(()=>{
    setShopAuth(JSON.parse(localStorage.getItem("customer-token")))
  })


  return (
    <div >

      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route path='shop/cart' element={<Cart />} />
              <Route path='' element={<Shopping />} />

            <Route element={<ShopPublic shopAuth={shopAuth} />}>

              <Route path='shop/auth/register' element={<ShopSignUp />} />
              <Route path='shop/auth/login' element={<ShopSignIn />} />

            </Route>

            <Route element={<ShopProtected shopAuth={shopAuth} />}>

              <Route path='shop/customers/update-profile' element={<CustomerProfile />} />
              <Route path='shop/orders' element={<Orders />} />
              <Route path='shop/orders/confirm' element={<Payment />} />
              <Route path='shop/orders/details' element={<OrderHistory />} />
              <Route path='shop/orders/single' element={<SingleBuy />} />
              </Route>

            </Route>
            <Route path='seller'>


              <Route element={<Public auth={auth} />}>

                <Route path="register" element={<Registration />}></Route>
                <Route path="auth/login" element={<Login setAuth={setAuth} />}> </Route>
                <Route path="auth/forgot-password" element={<ForgotPassword />}> </Route>
                <Route path="auth/reset-password" element={<ResetPassword />}> </Route>
              </Route>


              <Route element={<ProtectedRoutes auth={auth} />}>
                <Route path="my-profile" element={<MyProfile setAuth={setAuth} />}> </Route>
                <Route path="auth/my-profile/UpdateInfo" element={<UpdateInfo />}> </Route>
                <Route path="auth/my-profile/ListOfUsers" element={<ListOfUsers />}> </Route>
                <Route path="auth/my-profile/ChangePassword" element={<ChangePassword />}> </Route>
                <Route path="auth/my-profile/UpdateUserRole" element={<UpdateUserRole />}> </Route>
                <Route path="auth/my-profile/Demo" element={<Demo />}> </Route>
                <Route path="products" element={<HomeProducts />}> </Route>
                <Route path="products/product" element={<Product />}> </Route>
              </Route>
            </Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;

