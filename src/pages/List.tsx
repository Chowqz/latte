import React from 'react'
import { useSearchParams, Link } from 'react-router-dom'

const List = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  console.log(searchParams.get('name'))
  return (
    <>
      <div>List</div>
      <button onClick={() => setSearchParams({ num: '88' })}>
        setSearchParams
      </button>
      <Link to="/ads/detail/1">detail 1</Link>
      <Link to="/ads/detail/2">detail 2</Link>
    </>
  )
}

export default List
