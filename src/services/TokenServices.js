import React from 'react'



export function TokenServices() {
  return (
    <></>
  )
}

export function getToken(){
  return(
    JSON.parse(localStorage.getItem("token"))
  )
}

export function setToken(token) {
    return (
        localStorage.setItem('token',JSON.stringify(token))
    )
}


export function remToken(){
    return (
        localStorage.removeItem("token")
    )
}

