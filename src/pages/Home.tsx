import React from 'react'
import { useParams } from 'react-router-dom'

const Home = () => {
  const { id } =  useParams()
  console.log(id)
  return <div>Home</div>
}

export default Home