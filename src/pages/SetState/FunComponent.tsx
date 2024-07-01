import React, { useCallback, useState } from 'react'
import Child from './Child'

const FunComponent = () => {
  const [count, setCount] = useState(0)
  const handleChildClick = useCallback(() => {
    setCount(count + 1)
  }, [count])
  return (
    <div>
      <div>{count}</div>
      <Child onClick={handleChildClick} />
    </div>
  )
}

export default FunComponent
