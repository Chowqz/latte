import React from 'react'
import EventEmitter from './EventEmitter'
import { Subject, Observer } from './Subject'

const Index = () => {
  const execEventEmitter = () => {
    const EventEmitterInstance = new EventEmitter()

    const cb1 = (...args: any[]) => {
      console.log('onSay 1: ', ...args)
      // console.log(EventEmitterInstance.events)
    }

    const cb2 = (...args: any[]) => {
      console.log('onSay 2: ', ...args)
      // console.log(EventEmitterInstance.events)
    }

    EventEmitterInstance.emit('say', 'name', 'age', 'height')
    EventEmitterInstance.on('say', cb1)

    // EventEmitterInstance.off('say', cb2)
    EventEmitterInstance.once('say', cb2)

    EventEmitterInstance.emit('say', 'name', 'age', 'height')
    EventEmitterInstance.off('say', cb1)

    setTimeout(() => {
      EventEmitterInstance.emit('say', 'name', 'age', 'height')
    }, 2000)
  }
  execEventEmitter()

  const execSubject = () => {
    const subject = new Subject()
    const observer1 = new Observer('Observer_1')
    const observer2 = new Observer('Observer_2')
    const observer3 = new Observer('Observer_3')

    subject.add(observer1)
    subject.add(observer2)
    subject.add(observer3)

    subject.notify()

    setTimeout(() => {
      subject.notify()
    }, 2000)
  }

  execSubject()

  return <div>EventEmitter</div>
}

export default Index
