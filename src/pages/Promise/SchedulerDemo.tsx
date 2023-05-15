import React, { useRef } from 'react'
import Scheduler, { TaskItem, Sleeper } from './Scheduler'
import { Button } from 'antd'

const func = (i: number, j: number) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const k = i - j
      if (i === 3) {
        reject(k)
      }
      resolve(k)
    }, 100 * i)
  })

const func1 = (i: number) => {
  return i
}

const SchedulerDemo = () => {
  const sleepInstance = useRef<Sleeper>(new Sleeper())

  const instance = new Scheduler({
    maxExecCount: 4,
    // autoInterrupt: true,
    onProgressChange: () => {
      console.log()
    },
  })

  instance.setOnProgressChange(res => {
    console.log('progress: ', res)
  })

  const task = [6, 7, 11, 1, 5, 3, 8, 2, 5, 3, 12, 7].map((item, index) => {
    // const a = [func1, item, index]
    if (index === 3) {
      return [func1, item, index] as TaskItem
    }
    return [func, item, index] as TaskItem
  })
  instance.addTask(task)
  const exec = async () => {
    console.time()
    const p = instance.exec()
    await p
    console.log(p)
    console.timeEnd()
  }

  exec()

  // const sleepTest = async () => {
  //   for (let i = 1; i <= 10; i++) {
  //     await sleepInstance.current.sleeping()
  //     const res = await func(i)
  //     console.log(res)
  //   }
  // }

  const sleep = () => {
    sleepInstance.current.fallAsleep()
  }

  const wake = () => {
    sleepInstance.current.wakeUp()
  }

  const restart = () => {
    console.log('restart')
  }

  const pause = () => {
    console.log('pause')
  }

  return (
    <div>
      <Button onClick={sleep}>sleep</Button>
      <Button onClick={wake}>wake</Button>
      <Button onClick={restart}>restart</Button>
      <Button onClick={pause}>pause</Button>
    </div>
  )
}

export default SchedulerDemo

type Func = (...args: any[]) => any

type params = Parameters<Func>

type Handle = [funcTest: Func, ...args: params]

const fun1 = (i: number, j: number) => i + j
const fun2 = (a: string) => a + '1'
const fun3 = (person: { name: string; age: number }) => person.name

const list: Handle[] = [
  [fun1, 1, 2],
  // [(i: number, j: number) => i + j, 1, 2],
]

function addTask<T>(taskFunc: (...args: T[]) => any, ...args: T[]) {
  return taskFunc(...args)
}

addTask(fun1, 1, 2)
addTask(fun2, '1', '2')
addTask(fun3, { name: 'Cat', age: 26 })

console.log(list)
