import React from 'react'
import { useParams } from 'react-router-dom'

const UserProduct = () => {
    const {id}=useParams()
  return (
    <>
      {id}
    </>
  )
}

export default UserProduct
