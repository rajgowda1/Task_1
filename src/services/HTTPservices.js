import React from "react";
import axios from "axios";
import { getToken, TokenServices } from "./TokenServices";

const API_HOST_URL = "https://shop-api.ngminds.com"
const tok = JSON.parse(localStorage.getItem('token'))
const token = 'Bearer ' + tok

export function secureGet(url, token) {
  return (
    axios.get(`${API_HOST_URL}${url}`

      // {
      //   headers:
      //    { 
      //     Authorization: token
      //    }}

    )

  )
}



export function post(url, data) {
  console.log(data)
  return (
    axios.post(`${API_HOST_URL}${url}`, data)
  )
}

export function securePost(url, data) {
  return (
    axios.post(`${API_HOST_URL}${url}`, data
      // ,{
      //   headers:
      //    { 
      //     Authorization:token
      //    }}
    ))

}
export function securePatch(url, data) {
  return (
    axios.patch(`${API_HOST_URL}${url}`, data
      // ,{ headers: {  Authorization:token}}
    )
  )
}

export function deleteFun(url) {

  return (

    axios
      .delete(`${API_HOST_URL}${url}`
        //  , {headers: { Authorization:token}}
      )


  )

}

export function put(url,data) {
return (
  axios.put(`${API_HOST_URL}${url}`,data)
)
}



axios.interceptors.request.use(
  (config) => {

    const newToken = JSON.parse(localStorage.getItem("token"));
    const customerToken = JSON.parse(localStorage.getItem("customer-token"));
    // console.log("SEller", newToken)

    if(config.url.includes('/customers') || config.url.includes('/shop/') ) {
      if(customerToken){
          config.headers = { Authorization: `Bearer ${customerToken}` };
      }
      
    }
   else {
    if(newToken){
      console.log("Seller : ",newToken)
      config.headers = { Authorization: `Bearer ${newToken}` };
    }
    }
    
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

