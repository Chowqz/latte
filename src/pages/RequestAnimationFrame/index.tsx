// window.requestAnimationFrame() 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。
// 该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行
import React, { useCallback } from 'react'
import styles from './index.module.less'
import { CountDownDemo } from './CountDown'

let timer: any

const Demo = () => {
  const setTimeoutFn = useCallback(() => {
    const box1 = document.querySelector('#box-1') as HTMLElement
    const fn = () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        if (box1.offsetLeft > 720) {
          box1.style.left = '0px'
        } else {
          box1.style.left = box1.offsetLeft + 1 + 'px'
          fn()
        }
      }, 17)
    }
    fn()
  }, [])

  const requestAnimationFrameFn = useCallback(() => {
    const box2 = document.querySelector('#box-2') as HTMLElement
    const fn = () => {
      requestAnimationFrame(() => {
        if (box2.offsetLeft > 720) {
          box2.style.left = '0px'
        } else {
          box2.style.left = box2.offsetLeft + 1 + 'px'
          fn()
        }
      })
    }
    fn()
  }, [])

  const startAnimation = useCallback(() => {
    setTimeoutFn()
    requestAnimationFrameFn()
  }, [])

  return (
    <div>
      <div className={styles.container}>
        <button className="start-btn" onClick={startAnimation}>
          let&apos;s go
        </button>
        <div id="box-1" className={styles.box1}></div>
        <div id="box-2" className={styles.box2}></div>
      </div>
      <CountDownDemo />
    </div>
  )
}

export default Demo
