import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';    
import { useSearchParams } from 'react-router-dom';
import { secureGet } from '../services/HTTPservices';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import UpdateProduct from './UpdateProduct';
import DeleteProduct from './DeleteProduct';
import UpdateImages from './UpdateImages';
import Carousel from 'react-bootstrap/Carousel';


export default function Product() {


    
    const [productData,setProductData]=useState()

    const [searchParams] = useSearchParams();

    const pid = searchParams.get("pid")
    const url=`/products/${pid}`
    console.log("before");
  
     useEffect(()=>
    {
        secureGet(url)  
        .then((res)=>{
           console.log(res);
           setProductData(res.data) 
           console.log("inside useeffect");
    
        })
        .catch((err)=>
        {
           console.log(err);
        })
    },[])   


    console.log(productData);
    console.log(productData?._id);

    const img=productData?.images 
        // console.log(img); 

   
        const [show, setShow] = useState(false);

        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
      
        const [showDelete,setShowDelete]=useState(false)

        const handleCloseDelete=()=>{setShowDelete(false)}
        const handleShowDelete=()=>{setShowDelete(true)}
    
        const [showUpdateImages,setShowUpdateImages]=useState(false)

        const handleCloseUpdateImage=()=>{setShowUpdateImages(false)}
        const handleShowUpdateImage=()=>{setShowUpdateImages(true)}
    


  return (

<>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>UPDATE PRODUCT</Modal.Title>
        </Modal.Header>
        <Modal.Body>

            <UpdateProduct pid={pid}/>

        </Modal.Body>
      </Modal>

      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>DELETE PRODUCT</Modal.Title>
        </Modal.Header>
        <Modal.Body>

            <DeleteProduct pid={pid}/>

        </Modal.Body>
      </Modal>



      <Modal show={showUpdateImages} onHide={handleCloseUpdateImage}>
        <Modal.Header closeButton>
          <Modal.Title>UPDATE PRODUCT IMAGES</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <UpdateImages pid={pid} />

        </Modal.Body>
      </Modal>


    {/* <div>{Users}</div> */}
    <div  className='containerOuter '> 
    <Card  style={{ width: '35rem' }}> 

    

    {/* <Card.Img variant="dark" src={img} /> */}
    <Carousel slide={false}>
{productData?.images.map((img)=>{
  return(
 
   <Carousel.Item>
     
     <img
       className="d-block w-100"
       src={img.url}
     
     />
     
   </Carousel.Item>

   
   )
})}
</Carousel>



    <Card.Body>
      <Card.Title>{productData?.name}</Card.Title>
      <Card.Text>
        {productData?.description}
      </Card.Text>
      <Card.Text>
        ${productData?.price}
      </Card.Text>
      <Button variant="primary" onClick={handleShow}>UPDATE PRODUCT</Button>
      {"   "}
      <Button variant="primary" onClick={handleShowDelete} >DELETE PRODUCT</Button>
      {"   "}
      <Button variant="primary" onClick={handleShowUpdateImage} >UPDATE IMAGES</Button>
    </Card.Body>
  </Card></div>
</>  )
}

