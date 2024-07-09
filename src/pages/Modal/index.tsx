import React, { useState } from 'react'
import { Button } from 'antd'
import Modal from './Modal'

const Demo = () => {
  const [visible, setVisible] = useState(false)

  // 尽管portal中的组件挂载到root根组件外，但是仍在react组件树中，故portal中组件绑定的react合成点击事件仍然会冒泡到上层父级的react组件
  const handleParentClick = () => {
    console.log('parent click')
  }

  const handleChildClick = () => {
    console.log('child click')
  }

  return (
    <div onClick={handleParentClick}>
      <Button onClick={() => setVisible(true)}>open</Button>
      <Button onClick={() => setVisible(false)}>close</Button>
      <Modal title="Title" visible={visible} onCancel={() => setVisible(false)}>
        <div onClick={handleChildClick}>Demo</div>
      </Modal>
    </div>
  )
}

export default Demo
