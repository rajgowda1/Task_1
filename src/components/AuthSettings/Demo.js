import React from 'react'
import Accordion from 'react-bootstrap/Accordion';
import NavigationBar from '../../BasicFunctionalities/NavigationBar';
import {DatabaseFillUp, GearFill, PersonAdd, Upload} from 'react-bootstrap-icons';
import {post} from '../../services/HTTPservices'
import UpdateInfo from '../settings/UpdateInfo'
import CreateUser from '../settings/CreateUser'
import UpdateUserInfo from '../settings/UpdateUserInfo'
import UpdateUserRole from '../settings/UpdateUserRole'

function Demo() {
  
  return (
    <div className='authContainer'>

      <h2 className=' text-center text-light '> COMPANY SETTINGS </h2>
    <NavigationBar />
    
    <Accordion  className='accordian mt-2 text-center mb-3 '>
      
      <Accordion.Item eventKey="1" className='authHeader'>
        <Accordion.Header><DatabaseFillUp color='black' size={25}  />   Update Company Info</Accordion.Header>
        <Accordion.Body className='authSetting'>
         
          <UpdateInfo />
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="2" className='authHeader'>
        <Accordion.Header><PersonAdd color='black' size={25}  />  Create User</Accordion.Header>
        <Accordion.Body className='authSetting'>
         
          <CreateUser />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>

    
    </div>
  );
}

export default Demo;


    