import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { getToken } from '../services/TokenServices';
import { toast, Toaster } from 'react-hot-toast'
import { useDropzone } from 'react-dropzone';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};

const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
};

function AddProducts(props) {

    const formData = new FormData()
    const url = 'https://shop-api.ngminds.com/products'
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [editedData,setEditedData] = useState()
    const tok = getToken()
    const token = `Bearer ${tok}`

    const onSubmit = (data) => {

        console.log(data);
        data.description = editedData

        console.log(data);

        for (let i = 0; i < files.length; i++) {
            formData.append("images", files[i])
        }
        console.log("before");

        formData.append("name", data.name)
        formData.append("description", data.description)
        // formData.append("images",images)
        formData.append("price", data.price)
        console.log(formData)
        console.log(formData)
        axios.post(url, formData,
            {
                headers: {
                    Authorization: token,
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
            .then((res) => {
                console.log(res);
                toast.success("PRODUCT ADDED SUCCESSFULLY")
                // window.location.reload();
            })
            .catch((err) => {
                console.log(err);
                toast.error(err.response.data.message)
            })


    }

    const [files, setFiles] = useState([]);
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': []
        },
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });

    const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img
                    src={file.preview}
                    style={img}
                    // Revoke data uri after image is loaded
                    onLoad={() => { URL.revokeObjectURL(file.preview) }}
                />
            </div>
        </div>
    ));

    useEffect(() => {
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, []);

    return (
        <div>
            <div><Toaster /></div>
            <form onSubmit={handleSubmit(onSubmit)} className='text-center d-grid h-100' id='form-log' >


                <div className=" mt-3">
                    <label>NAME</label>
                    <input
                        type="text"
                        placeholder="name"
                        className="form-control"
                        {...register("name", { required: true })}
                    />
                </div>
                {errors.name && <p className="text-warning">please check name</p>}

                <div className=" mt-3 h-75"> <label>Description</label>
                 {
                  <CKEditor
                  editor={ ClassicEditor }
                  data="<p>Hello from CKEditor 5!</p>"
                  onReady={ editor => {
                      // You can store the "editor" and use when it is needed.
                      console.log( 'Editor is ready to use!', editor );
                  } }
                  onChange={ ( event, editor ) => {
                      const data = editor.getData();
                      console.log( { event, editor, data } );
                      console.log(data,"new data");
                      setEditedData(data)
                  } }
                  onBlur={ ( event, editor ) => {
                      console.log( 'Blur.', editor );
                  } }
                  onFocus={ ( event, editor ) => {
                      console.log( 'Focus.', editor );
                    
                  } }
              />
                }
                {editedData}
                    </div>

                <br></br>
                <section className="container border-primary border">
                    <div style={{ height: "100px" }}{...getRootProps({ className: 'dropzone' })}>
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    </div>
                    <aside style={thumbsContainer}>
                        {thumbs}
                    </aside>
                </section>
                
                <div className=" mt-3"> <label>Price</label>
                    <input
                        type="number"
                        placeholder="price"
                        className="form-control"
                        {...register("price", { required: true })}
                    />
                </div>
                {errors.price && <p className="text-warning">please enter price</p>}

                <button className='btn btn-dark btn-lg btn-block mt-3 mb-3' type='submit'>Add Product</button>
            </form>


        </div>
    )
}

export default AddProducts