import React from 'react'
import Swal from 'sweetalert2'
import { deleteFun } from '../../services/HTTPservices'

function DeleteCustomer() {
    const delUrl = "/customers/account"
    const deleteCust = () => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                deleteFun(delUrl)
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
        })


    }
    return (
        <div>
            <button onClick={deleteCust}
                className='btn btn-danger w-25'>YES</button></div>
    )
}

export default DeleteCustomer