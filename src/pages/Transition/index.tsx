import React, { useRef, useState } from 'react'
import { Button } from 'antd'
import { CSSTransition } from 'react-transition-group'
import './index.less'

const Demo = () => {
  const [visible, setVisible] = useState(false)
  const nodeRef = useRef(null)

  return (
    <>
      <Button onClick={() => setVisible(true)}>show</Button>
      <Button onClick={() => setVisible(false)}>hide</Button>
      <CSSTransition
        nodeRef={nodeRef}
        in={visible}
        timeout={3000}
        classNames="fade"
        unmountOnExit
      >
        <div className="box" ref={nodeRef}></div>
      </CSSTransition>
    </>
  )
}

export default Demo
