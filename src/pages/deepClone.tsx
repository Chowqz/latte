import React from 'react'

export function deepClone(target: any, map = new WeakMap()) {
  console.log(map)
  return target
}

const DeepClone = () => {
  return <div>deepclone</div>
}

export default DeepClone
