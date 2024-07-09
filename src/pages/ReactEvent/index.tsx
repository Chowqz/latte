// react合成事件与DOM原生事件区别
// https://zhuanlan.zhihu.com/p/49067231
// 同一个dom同时绑定合成事件和原生事件，原生事件会先触发，合成事件后触发
// 合成事件是并没用真正在DOM元素上绑定事件，而是以事件委托的方式，在document对象上注册所有事件，在冒泡到document的时候派发对应的事件执行程序

import React, { useEffect } from 'react'

const Demo = () => {
  const handleBtnWrapperClick = () => {
    console.log('btn-wrapper is clicked by React Event')
  }

  const handleBtnClick = (e: any) => {
    e.stopPropagation()
    console.log('btn is clicked by React Event')
  }

  useEffect(() => {
    document.querySelector('#btn-wrapper')?.addEventListener('click', () => {
      console.log('btn-wrapper is clicked by native event')
    })
    document.querySelector('#btn')?.addEventListener('click', () => {
      // e.stopPropagation()
      console.log('btn is clicked by native event')
    })
  }, [])

  return (
    <div id="btn-wrapper" onClick={handleBtnWrapperClick}>
      <button id="btn" onClick={handleBtnClick}>
        Click Me
      </button>
    </div>
  )
}

export default Demo
