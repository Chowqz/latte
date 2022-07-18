import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export const Child1 = () => <div>Child 1</div>
export const Child2 = () => <div>Child 2</div>

const Children = () => {
  return (
    <>
      <div>Children</div>
      <Link to="/children/child1">child1</Link>
      <Link to="/children/child2">child2</Link>
      <Outlet></Outlet>
    </>
  )
}

export default Children
