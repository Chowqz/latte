import React, { useEffect } from 'react'

let time = 0

const Index = () => {
  useEffect(() => {
    document.querySelector('#test')?.addEventListener('click', e => {
      console.log(e.type)
      console.log(time)
      console.log(Date.now() - time)
      alert(Date.now() - time)
    })
    document.querySelector('#test')?.addEventListener('touchstart', e => {
      console.log(e.type)
      time = Date.now()
      console.log(time)
    })
    document.querySelector('#test')?.addEventListener('touchmove', e => {
      console.log(e.type)
    })
    document.querySelector('#test')?.addEventListener('touchend', e => {
      console.log(e.type)
    })
    document.querySelector('#test')?.addEventListener('mousedown', e => {
      console.log(e.type)
    })
    document.querySelector('#test')?.addEventListener('mousemove', e => {
      console.log(e.type)
    })
    document.querySelector('#test')?.addEventListener('mouseup', e => {
      console.log(e.type)
    })
  }, [])

  return <button id="test">Click me</button>
}

export default Index
