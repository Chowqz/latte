import React from 'react'
import { useLocation } from 'react-router-dom'

const State = () => {
  const { state } =  useLocation()
  console.log(state)
  return <div>State</div>
}

export default State