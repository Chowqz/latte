import React, { useState, useEffect, useRef } from 'react'

interface Props {
  initialCount: number
  targetCount: number
  step: number
  ms: number
  callback: (count: number) => void
}

class CountDown {
  count: number = 0
  initialCount: number = 0
  startCount: number = 0
  targetCount: number = 0
  step: number = 0
  ms: number = 0
  startTime: number = 0
  prevTime: number = 0
  nextExecTime: number = 0
  pausedFlag: boolean = false
  callback: (count: number) => void

  constructor(props: Props) {
    this.count = props.initialCount
    this.initialCount = props.initialCount
    this.targetCount = props.targetCount
    this.step = props.step
    this.ms = props.ms
    this.callback = props.callback
    this.animate = this.animate.bind(this)
    // setInterval(() => {
    //   let n = 0
    //   while (n++ < 1000000000);
    // }, 0)
  }

  animate(time: number) {
    if (this.pausedFlag || this.isFinish()) {
      return
    }
    const elapsedTime = time - this.prevTime
    if (elapsedTime >= this.nextExecTime) {
      console.log('elapsedTime: ', elapsedTime)
      console.log('nextExecTime: ', this.nextExecTime)
      this.prevTime = time
      this.count = this.count + this.step
      const diffTime =
        performance.now() -
        this.startTime -
        (Math.abs(this.startCount - this.count) * this.ms) / this.step
      this.nextExecTime = this.ms - diffTime
      if (this.nextExecTime < 0) {
        this.nextExecTime = 0
      }
      this.callback(this.count)
      if (this.count == this.targetCount) {
        const totalDiffTime =
          performance.now() -
          this.startTime -
          Math.abs(this.startCount - this.targetCount) * this.ms
        console.log(totalDiffTime)
        return
      }
    }
    requestAnimationFrame(this.animate)
  }

  start() {
    this.count = this.initialCount
    this.startCount = this.initialCount
    this.startTime = performance.now()
    this.prevTime = performance.now()
    this.nextExecTime = this.ms
    this.pausedFlag = false
    this.callback(this.count)
    requestAnimationFrame(this.animate)
  }

  pause() {
    if (this.isFinish()) {
      return
    }
    this.pausedFlag = true
  }

  unPause() {
    if (!this.pausedFlag || this.isFinish()) {
      return
    }
    this.startCount = this.count
    // performance.now() 返回的是自文档生命期开始以来所经过的毫秒数量
    this.startTime = performance.now()
    this.prevTime = performance.now()
    this.nextExecTime = this.ms
    this.pausedFlag = false
    requestAnimationFrame(this.animate)
  }

  isFinish() {
    return (
      (this.step < 0 && this.count <= this.targetCount) ||
      (this.step > 0 && this.count >= this.targetCount)
    )
  }
}

export const CountDownDemo = () => {
  const [count, setCount] = useState(10)
  const countDownRef = useRef<any>()

  const start = () => {
    countDownRef.current.start()
  }

  const pause = () => {
    countDownRef.current.pause()
  }

  const unPause = () => {
    countDownRef.current.unPause()
  }

  useEffect(() => {
    countDownRef.current = new CountDown({
      initialCount: 0,
      targetCount: 100,
      step: 1,
      ms: 1000,
      callback: (count: number) => {
        console.log('callback: ', count)
        setCount(count)
      },
    })
  }, [])

  return (
    <div>
      <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={unPause}>UnPause</button>
      <div>count: {count}</div>
    </div>
  )
}

export default CountDown
