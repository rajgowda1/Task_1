import React from 'react'
import NavigationBar from '../NavigationBar';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { getToken } from '../../services/TokenServices';
import { useState , useEffect } from 'react';
import  { useForm } from 'react-hook-form'

import { Paginations } from '../../Pagination/Paginations';
import Form from 'react-bootstrap/Form';
import * as Icon from 'react-bootstrap-icons';
import UpdateUserInfo from "../settings/UpdateUserInfo"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';  
import DeleteUser from './DeleteUser';
import UpdateUserRole from './UpdateUserRole';


import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';


function ListOfUsers() {
  const token=getToken();
  const [userData,setUserData]=useState()
  const {register,handleSubmit,reset,formState:{errors}}=useForm();
  const [delId,setDelId]=useState()
  const [userInfoId,setUserInfoId]=useState()
  const [userRoleId,setUserRoleId]=useState()
  const [currentPage,setCurrentPage]=useState(1)
  const [realData,setRealData]=useState()

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showUserInfo, setShowUserInfo] = useState(false);
  const handleCloseUserInfo = () => setShowUserInfo(false);
  const handleShowUserInfo = () => setShowUserInfo(true);

  const [showUserRole,setShowUserRole] = useState(false)
  const handleShowUserRole =()=> setShowUserRole(true)
  const handleCloseUserRole =()=> setShowUserRole(false)

  const pageInc=()=>{
    setCurrentPage(currentPage + 1)
  }

  const pageDec=()=>{
    setCurrentPage(currentPage-1)
  }

  









  const onSubmit = (data) =>{
     console.log(data);
      setRealData(data)

    

      const name =(data?.name ? `&name=${data?.name}` : '')
      const limit =(data?.limit ? `&limit=${data?.limit}` : '')
      const role =(data?.role ? `&role=${data?.role}` : '')
      const sortBy =(data?.sortBy ? `&sortBy=${data?.sortBy}` : '')
      const page =`&page=${currentPage}`
      const queryParameter=`${name}${limit}${role}${sortBy}${page}`
  
      console.log(queryParameter);
      console.log(currentPage);
      axios.get(`https://shop-api.ngminds.com/users?${queryParameter}`,
      {
        headers:
        { Authorization: `Bearer ${token}` }
      })
      .then((response)=>
      {
        setUserData(response.data.results);
        console.log(response.data.page);
       })
      .catch((error)=>
      {
        console.log(error);
      })
  }
  // {

  
      useEffect(()=>{
        onSubmit(realData);
      },[currentPage])



    useEffect(()=>{

     
        axios.get(`https://shop-api.ngminds.com/users`,
        {
          headers:
          { Authorization: `Bearer ${token}` }
        })
        .then((response)=>
        {
          setUserData(response.data.results);
          console.log(response.data.results);
         })
        .catch((error)=>
        {
          console.log(error);
        })
      },[])
  


  return (
    <div>
    <NavigationBar />
    
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>DeleteUser </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DeleteUser delId={delId}
           />
        </Modal.Body>
        
    </Modal>

    {/* ======================================= */}

      <Modal show={showUserInfo} onHide={handleCloseUserInfo}>
        <Modal.Header closeButton>
          <Modal.Title>Update User Info </Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <UpdateUserInfo userInfoId={userInfoId} />
         
        </Modal.Body>
        
      </Modal>

      {/* ------------------------------------------- */}

      <Modal show={showUserRole} onHide={handleCloseUserRole}>
        <Modal.Header closeButton>
          <Modal.Title>Update User Info </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <UpdateUserRole userRoleId={userRoleId}/>
         
        </Modal.Body>
        
      </Modal>


    
    <div className='paginationInput '>


      <form bg="primary" className='text-center d-grid mt-5   ' id='form-log' onSubmit={handleSubmit(onSubmit)}>

        <input id='listForm'
          placeholder='name'
          type="text"
          {...register("name")}
        />

        <input  id='listForm'
          placeholder='limit'
          type="number"
          {...register("limit")}
        />
        
         <div >
          ROLE  :
          <label htmlFor="user">
            <input id='listFormCheck'
              {...register('role')}
              type="radio"
              name="role"
              value="user"
             
            />
            USER
          </label>
       

        
          <label htmlFor="admin">
            <input id='listFormCheck'
              {...register('role')}
              type="radio"
              name="role"
              value="admin"
              
            />
            ADMIN
          </label>
        </div>
<br></br>
<label>SORT BY</label>
        <select className="form-select" id='select' aria-label="Default select example" {...register("sortBy")}>
            <option value="date">date</option>
            <option value="name">name</option>
       

          
      </select>
      
        
         
        <button className='btn btn-dark btn-lg btn-block mt-2' type='submit'>FILTER</button>

      </form>
    </div>
    <div className='table'>

    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>email</th>
        
          <th>role</th>
          <th>action</th>
        </tr>
      </thead>
      <tbody>
       
        {
        userData && userData.map((data,i)=>{
        return(<tr key={i}>
          <td>{i+1}</td>
          <td>{data.name}</td>
          <td>{data.email}</td>
          <td>{data.role}    
          
          <Icon.PencilFill 
          onClick={()=>{
            handleShowUserRole()
            setUserRoleId(data)
          }}
          color="white" size={20} set /> </td>
          

          <td><Icon.TrashFill 
                onClick={()=>
                  {
                  handleShow();
                  setDelId(data);
                }} 
                color="white" size={20}  />  
                
                
                <Icon.GearFill 
                onClick={()=>
                {
                 

                  handleShowUserInfo();
                  setUserInfoId(data);
      
                  
                
                }}
                 color="white" size={20}  /></td>
              </tr>)
              })
        }
      </tbody>
    </Table>

</div> <div className="d-flex justify-content-evenly mb-5">
    
    <ButtonToolbar aria-label="Toolbar with button groups">
      <ButtonGroup className="me-2" aria-label="First group">
      {(currentPage>1 ? <Button onClick={pageDec}>PREV</Button> : <></>)}
      </ButtonGroup>
      <ButtonGroup className="me-2" aria-label="Second group">
        <Button>{currentPage}</Button> 
      </ButtonGroup>
      <ButtonGroup aria-label="Third group">
        <Button onClick={pageInc}>NEXT</Button>

      </ButtonGroup>
    </ButtonToolbar>

    </div>
    </div>
  )
}

export default ListOfUsers