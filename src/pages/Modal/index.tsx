import React, { useState } from 'react'
import { Button } from 'antd'
import Modal from './Modal'

const Demo = () => {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <Button onClick={() => setVisible(true)}>open</Button>
      <Button onClick={() => setVisible(false)}>close</Button>
      <Modal title="Title" visible={visible} onCancel={() => setVisible(false)}>
        <div>Demo</div>
      </Modal>
    </>
  )
}

export default Demo
