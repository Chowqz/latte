import React from 'react'
import { useSearchParams } from 'react-router-dom'

const List = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  console.log(searchParams.get('name'))
  return (
    <>
      <div>List</div>
      <button onClick={() => setSearchParams({ num: '88' })}>
        setSearchParams
      </button>
    </>
  )
}

export default List
