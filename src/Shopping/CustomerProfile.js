import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ShopNavigationBar from './ShopNavigationBar';

import Card from 'react-bootstrap/Card';
import { Button, ButtonGroup } from 'react-bootstrap';
import axios from 'axios';
import { deleteFun, secureGet } from '../services/HTTPservices';
import Accordion from 'react-bootstrap/Accordion';
import {DatabaseFillUp, GearFill, PersonAdd, Trash2Fill, Upload} from 'react-bootstrap-icons';
import Modal from 'react-bootstrap/Modal';
import UpdateCustProfile from './Settings/UpdateCustProfile';
import UpdateProfilePic from './Settings/UpdateProfilePic';
import { toast } from 'react-hot-toast';
import AddNewAdd from './Settings/AddNewAdd';
import UpdateAddress from './Settings/UpdateAddress';
import ChangeCustomerPassword from './Settings/ChangeCustomerPassword';
import DeleteCustomer from './Settings/DeleteCustomer';

function CustomerProfile() {

  const [customerData,setCustomerData]=useState()

  const [addressData,setAddressData]=useState()
  const [addId,setAddId]=useState()


  const customerUrl = "/shop/auth/self"
  const AddressUrl = "/customers/address"

  useEffect(()=>{

    secureGet(customerUrl)
    .then((res)=>{
      console.log(res);
      setCustomerData(res.data)
    })
    .catch((err)=>{
      console.log(err);
    })
    

    secureGet(AddressUrl)
  .then((res)=>{
     
      setAddressData(res.data)
      
     
  })
  .catch((err)=>{
      console.log(err);
      toast.error(err.response.data.message)
  })
    
},[] )

  console.log(addressData);


  const [showUpdateProfile, setShowUpdateProfile] = useState(false);
  const handleCloseUpdateProfile = () => setShowUpdateProfile(false);
  const handleShowUpdateProfile = () => setShowUpdateProfile(true);

  const [showUpdatePic, setShowUpdatePic] = useState(false);
  const handleCloseUpdatePic = () => setShowUpdatePic(false);
  const handleShowUpdatePic = () => setShowUpdatePic(true);

  const [showUpdateAdd, setShowUpdateAdd] = useState(false);
  const handleCloseUpdateAdd = () => setShowUpdateAdd(false);
  const handleShowUpdateAdd = () => setShowUpdateAdd(true);

  const removePic=()=>{
      const deleteUrl = "/customers/profile-picture"

      deleteFun(deleteUrl)
      .then((res)=>{
          console.log(res);
          window.location.reload();
          toast.success("PROFILE PIC SUCCESSFULLY REMOVED")
      })
      .catch((err)=>{
        console.log(err);
        toast.error(err.response.data.message)
      })
    }

  const removeAddress=()=>{
      const remAddUrl="/customers/address/:addressId"
      deleteFun(remAddUrl)
      .then((res)=>{
        console.log(res);
        window.location.reload();
        toast.success("ADDRESS REMOVED SUCCESSFULLY")
      })
      .catch((err)=>{
        console.log(err);
        toast.error(err.response.data.message)
      })

  }


  



  
  return (
    <>
      <ShopNavigationBar/>

      <Modal show={showUpdateProfile} onHide={handleCloseUpdateProfile}>
        <Modal.Header closeButton>
          <Modal.Title>UPDATE CUSTOMER PROFILE</Modal.Title>
        </Modal.Header>
        <Modal.Body><UpdateCustProfile/></Modal.Body>
        
      </Modal>

      <Modal show={showUpdatePic} onHide={handleCloseUpdatePic}>
        <Modal.Header closeButton>
          <Modal.Title>UPDATE CUSTOMER PROFILE PICTURE</Modal.Title>
        </Modal.Header>
        <Modal.Body><UpdateProfilePic/></Modal.Body>
        
      </Modal>


      <Modal show={showUpdateAdd} onHide={handleCloseUpdateAdd}>
        <Modal.Header closeButton>
          <Modal.Title>UPDATE ADDRESS</Modal.Title>
        </Modal.Header>
        <Modal.Body><UpdateAddress addId={addId}/></Modal.Body>
        
      </Modal>


   
      <div>
      <Container fluid>
      <Row>
        
        <Col>
        <div>   
                  <Card className='cards mt-5  align-items-center' bg='dark' style={{width:'70%',height:"35rem"}}  >

                        
                  <Card.Img variant="top" className='m-2 p-2' src={customerData?.picture} style={{height:'300px',borderRadius:"10%" }}/>

                  <Card.Body  >
                    
                    <Card.Title className='d-flex justify-content-center text-white' >NAME : {customerData?.name} </Card.Title>

                    <Card.Title className='d-flex justify-content-center text-white'>
                    EMAIL : {customerData?.email}
                    </Card.Title> 
                       <div className='d-flex justify-content-center'>

                        <Button variant="warning"  className='m-1' onClick={handleShowUpdatePic}>UPDATE PROFILE PIC</Button>

                        <Button variant="danger" className='m-1' onClick={removePic}>REMOVE PROFILE PIC</Button>
                      </div> 
                      <Button variant="secondary " className='mt-3 ' style={{width:"100%"}} onClick={handleShowUpdateProfile} >UPDATE CUSTOMER PROFILE </Button>
                  </Card.Body>

                 </Card> 
         </div>
       </Col>

        <Col className="" style={{height:"",border:"2px black"}} md={8}>

          <div className='authContainer' style={{width:'80%'}}>
                <Accordion  className='accordian text-center mb-3 '>
              
              <Accordion.Item eventKey="1" className='authHeader'>
                <Accordion.Header><DatabaseFillUp color='black' size={25}  />. ADD NEW ADDRESS</Accordion.Header>
                <Accordion.Body className='authSetting'>
                
                  <AddNewAdd />
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="2" className='authHeader'>
                <Accordion.Header><GearFill color='black' size={25}  />. CHANGE PASSWORD</Accordion.Header>
                <Accordion.Body className='authSetting'>
                <ChangeCustomerPassword/>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="3" className='authHeader'>
                <Accordion.Header><Trash2Fill color='black' size={25}  />. DELETE ACCOUNT</Accordion.Header>
                <Accordion.Body className='authSetting'>
                <DeleteCustomer/>
                </Accordion.Body>
              </Accordion.Item>

            </Accordion>
         </div>
                
            
        </Col>


      </Row>
    </Container>
   </div>
   
   <div className='row ' >
{addressData?.map((item,i)=>{
  return(
    <div className='col-3'>
    <Card className='cards mt-5 bg-light'  style={{ width: '20rem' }}>
    
    <Card.Body>
      
      <Card.Title className='d-flex justify-content-center fs-3 ' style={{height:"30px" }}>ADDRESS {i+1}</Card.Title><hr/>
    
      <Card.Text className='d-flex justify-content-center'>
      STREET :  {item?.street}
      </Card.Text >

      <Card.Text className='d-flex justify-content-center'>
      ADDRESSLINE :  {item?.addressLine2}
      </Card.Text >

      <Card.Text className='d-flex justify-content-center'>
      CITY :  {item?.city}
      </Card.Text >

      <Card.Text className='d-flex justify-content-center'>
      STATE :  {item?.state}
      </Card.Text >

      <Card.Text className='d-flex justify-content-center'>
       PIN :  {item?.pin}
      </Card.Text >
        
    </Card.Body>
    <div className='d-flex justify-content-center'>

         <Button variant="warning"  className=' m-1 ' onClick={()=>
                                                                {handleShowUpdateAdd()
                                                                setAddId(item) }} >UPDATE</Button>

         <Button variant="danger" className='m-1' onClick={(removeAddress)}>REMOVE</Button>
    </div>  <hr/>

  </Card>
  
    </div>

    )
})}
</div>
  </>
  )
}

export default CustomerProfile