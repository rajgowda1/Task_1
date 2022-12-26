import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import {BrowserRouter ,Routes,Route } from "react-router-dom"
import Registration from "./BasicFunctionalities/Registration"
import Login from "./BasicFunctionalities/Login"
import MyProfile from "./BasicFunctionalities/MyProfile"
import {useState,useEffect} from 'react'
import ProtectedRoutes from './BasicFunctionalities/Protected';
import axios from "axios";
import HTTPcalls from './services/HTTPservices'
import Public from './BasicFunctionalities/Public'

import NavigationBar from './BasicFunctionalities/NavigationBar';
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

import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeProducts from './Products/HomeProducts';
import Product from './Products/Product';
import Shopping from './Shopping/Shopping';
import ShopProduct from './Shopping/ShopProduct';
import ShopSignUp from './Shopping/ShopSignUp';
import ShopSignIn from './Shopping/ShopSignIn';
import CustomerProfile from './Shopping/CustomerProfile';
// toast.configure()

function App() {  

  const[auth,setAuth]=useState(JSON.parse(localStorage.getItem("token"))||null)

  useEffect(()=>{
    setAuth(JSON.parse(localStorage.getItem("token")))},[])   


  return (
    <div >

  <BrowserRouter>
      
    <Routes>

        <Route path='/'>

              <Route path='' element={<Shopping />}/>

              <Route path='shopProduct' element={<ShopProduct />}/>

              <Route path='shop/auth/register' element={<ShopSignUp />}/>
              <Route path='shop/auth/login' element={<ShopSignIn />}/>

              <Route path='shop/customers/update-profile' element={<CustomerProfile />}/>

              

        </Route>

        
        
        
        
    <Route path='seller'>

        
      <Route element={<Public auth={auth} />}>

        <Route  path = "register" element={<Registration/> }></Route>
        <Route  path = "auth/login" element={<Login setAuth={setAuth}/> }> </Route>
        <Route  path = "auth/forgot-password" element={<ForgotPassword /> }> </Route>

        <Route  path = "auth/reset-password" element={<ResetPassword /> }> </Route>
        
        </Route>
        
     
        <Route element={<ProtectedRoutes auth={auth} />}> 
        <Route  path = "my-profile" element={<MyProfile setAuth={setAuth} />}> </Route>
        <Route  path = "auth/my-profile/UpdateInfo" element={<UpdateInfo /> }> </Route>
        <Route  path = "auth/my-profile/ListOfUsers" element={<ListOfUsers /> }> </Route>
        <Route  path = "auth/my-profile/ChangePassword" element={<ChangePassword /> }> </Route>
        {/* <Route  path = "/auth/my-profile/UpdateUserInfo" element={<UpdateUserInfo /> }> </Route>
        <Route  path = "/auth/my-profile/UpdateUserRole" element={<UpdateUserRole /> }> </Route> */}
        {/* <Route  path = "/auth/my-profile/DeleteUser" element={<DeleteUser /> }> </Route> */}

        <Route  path = "auth/my-profile/UpdateUserRole" element={<UpdateUserRole /> }> </Route>



        <Route  path = "auth/my-profile/Demo" element={<Demo /> }> </Route>


        <Route  path = "products" element={<HomeProducts /> }> </Route>
        <Route  path = "products/product" element={<Product /> }> </Route>
        
       
        </Route>

    </Route>
    </Routes>
  </BrowserRouter>
      
    </div>
  );
}

export default App;



{/* <div >

<BrowserRouter>

<Routes>
  
<Route element={<Public auth={auth} />}>

  <Route exact path = "/" element={<Registration/> }></Route>
  <Route exact path = "/auth/login" element={<Login setAuth={setAuth}/> }> </Route>
  <Route exact path = "/auth/forgot-password" element={<ForgotPassword /> }> </Route>

  <Route exact path = "/auth/reset-password" element={<ResetPassword /> }> </Route>
  



  </Route>
  

  <Route element={<ProtectedRoutes auth={auth} />}>
 
   <Route exact path = "/my-profile" element={<MyProfile setAuth={setAuth} />}> </Route>

  <Route exact path = "/auth/my-profile/UpdateInfo" element={<UpdateInfo /> }> </Route>
  <Route exact path = "/auth/my-profile/ListOfUsers" element={<ListOfUsers /> }> </Route>
  <Route exact path = "/auth/my-profile/ChangePassword" element={<ChangePassword /> }> </Route>
 

  <Route exact path = "/auth/my-profile/UpdateUserRole" element={<UpdateUserRole /> }> </Route>



  <Route exact path = "/auth/my-profile/Demo" element={<Demo /> }> </Route>


  <Route exact path = "/products" element={<HomeProducts /> }> </Route>
  <Route exact path = "/products/product" element={<Product /> }> </Route>
  
 
  </Route>

  </Routes>
</BrowserRouter>

</div> */}