import React from 'react'

const PromisePlusDemo = () => {
  const fun = () =>
    new Promise(resolve => {
      resolve(1)
    })
  const p = Promise.resolve(fun())
  p.then(res => {
    console.log(res)
  })
  return <div>PromoisePlusDemo</div>
}

export default PromisePlusDemo
