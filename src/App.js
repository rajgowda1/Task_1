import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import {BrowserRouter ,Routes,Route } from "react-router-dom"
import Registration from "./components/Registration"
import Login from "./components/Login"
import MyProfile from "./components/MyProfile"
import {useState,useEffect} from 'react'
import ProtectedRoutes from './components/Protected';
import axios from "axios";
import HTTPcalls from './services/HTTPservices'
import Public from './components/Public'

import NavigationBar from './components/NavigationBar';
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
// toast.configure()

function App() {  

  const[auth,setAuth]=useState(JSON.parse(localStorage.getItem("token"))||null)

  useEffect(()=>{
    setAuth(JSON.parse(localStorage.getItem("token")))},[])
  

    //pagination /
    // const [data, setData] = useState([])
    // const [loading, setLoading] = useState(true);

    // const [currentPage, setCurrentPage] = useState(1);
    // const [recordsPerPage] = useState(10);

    // const currentRecords = data.slice(indexOfFirstRecord, 
    //   indexOfLastRecord);
    //   const nPages = Math.ceil(data.length / recordsPerPage)
    // const [posts,setPosts] = useState([]);
    // const [loading,setloading] = useState(false);
    // const [currentPage,setCurrentPage] = useState (1);
    // const [postsPerPage , setPostsPerPage] = useState(10);

    // useEffect(() => {
    //     const fetchPosts =async () => {
    //       setloading(true);
    //       const res = await axios.get('');
          
    //       setPosts(res.data);
    //       setloading(false);

    //     }

    //     fetchPosts();
    // },[]);
    
  
    
  // })

  // const [isLoggedIn, setisLoggedIn] = useState(null);
  // const logIn = () => {
  //   setisLoggedIn(true);
  // };
  // const logOut = () => {
  //   setisLoggedIn(false);
  // };
 
    
  //     <Navbar />
  //     {isLoggedIn ? (
  //       <button onClick={logOut}>Logout</button>
  //     ) : (
  //       <button onClick={logIn}>Login</button>
  //     )}



  return (
    <div >

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
        {/* <Route exact path = "/auth/my-profile/UpdateUserInfo" element={<UpdateUserInfo /> }> </Route>
        <Route exact path = "/auth/my-profile/UpdateUserRole" element={<UpdateUserRole /> }> </Route> */}
        {/* <Route exact path = "/auth/my-profile/DeleteUser" element={<DeleteUser /> }> </Route> */}

        <Route exact path = "/auth/my-profile/UpdateUserRole" element={<UpdateUserRole /> }> </Route>



        <Route exact path = "/auth/my-profile/Demo" element={<Demo /> }> </Route>


        <Route exact path = "/products" element={<HomeProducts /> }> </Route>
        <Route exact path = "/products/product" element={<Product /> }> </Route>
        
       
        </Route>

        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
