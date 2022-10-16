import React from 'react'
import { useParams } from 'react-router-dom'

const GalleryShow = () => {

  const params = useParams()
  console.log(params)

  return (
    <div>GalleryShow</div>
  )
}

export default GalleryShow
