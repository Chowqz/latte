import React from 'react'

const Child = (props: any) => {
  console.log('child render')
  return <div onClick={props?.onClick}>child count: {props.num}</div>
}

export default React.memo(Child)
