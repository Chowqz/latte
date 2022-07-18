import React, { useCallback, useState } from 'react'
import { Route, Routes, Link, useNavigate } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import List from './pages/List'
import Children, { Child1, Child2 } from './pages/Children'
import State from './pages/State'

function App() {
  const navigate = useNavigate()
  const handleNavigate = useCallback(() => {
          navigate('/state', {
            replace: true,
            state: {
              id: 123,
            },
          })
  }, [])
  return (
    <div className="App">
      <Link to="/home/1">
        <span>home</span>
      </Link>
      <Link to="/list?name=test">
        <span>list</span>
      </Link>
      <Link to="/children">children</Link>
      <button onClick={handleNavigate}>state</button>
      <Link to="/state" state={{ id: 68, name: 'test' }}>
        <span>State</span>
      </Link>

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/home/:id" element={<Home />}></Route>
        <Route path="/list" element={<List />}></Route>
        <Route path="/children" element={<Children />}>
          <Route index element={<div>default child</div>}></Route>
          <Route path="child1" element={<Child1 />}></Route>
          <Route path="/children/child2" element={<Child2 />}></Route>
        </Route>
        <Route path="/state" element={<State />} />
      </Routes>
    </div>
  )
}

export default App
