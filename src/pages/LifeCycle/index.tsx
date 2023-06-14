import React, { Component } from 'react'
import { Button } from 'antd'

const person: keyof {
  name: string
  age: number
} = 'name'

console.log(person)

type ParentState = {
  count: number
  displayFlag: boolean
}

class Parent extends Component<any, ParentState> {
  constructor(props: any) {
    super(props)
    console.log('Parent constructor')
    this.state = {
      displayFlag: true,
      count: 0,
    }
    this.toggleDisplayFlag = this.toggleDisplayFlag.bind(this)
    this.changeCount = this.changeCount.bind(this)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromProps(nextProps: any, nextState: any) {
    console.log('=========parent getDerivedStateFromProps==========')
    return null
  }

  componentDidMount() {
    console.log('parent componentDidMount')
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  shouldComponentUpdate(nextProps: any, nextState: any) {
    console.log('parent shouldComponentUpdate')
    return true
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getSnapshotBeforeUpdate(prevProps: any, prevState: any) {
    console.log('parent getSnapshotBeforeUpdate')
    return null
  }

  componentDidUpdate() {
    console.log('parent componentDiUpdate')
  }

  componentWillUnmount() {
    console.log('parent componentWillUnmount')
  }

  toggleDisplayFlag() {
    this.setState(prev => ({
      ...prev,
      displayFlag: !prev.displayFlag,
    }))
  }

  changeCount() {
    this.setState(prev => ({
      ...prev,
      count: prev.count + 1,
    }))
  }

  render() {
    console.log('parent render')
    const { displayFlag, count } = this.state
    return (
      <div>
        <h3>parent组件</h3>
        <Button onClick={this.toggleDisplayFlag}>改变子组件显示状态</Button>
        <Button onClick={this.changeCount}>改变自身状态</Button>
        {displayFlag && <Child num={count} />}
      </div>
    )
  }
}

type ChildProps = {
  num: number
}

type ChildState = {
  count: number
}

class Child extends Component<ChildProps, ChildState> {
  constructor(props: any) {
    super(props)
    console.log('child constructor')
    this.state = {
      count: 0,
    }
    this.changeCount = this.changeCount.bind(this)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromProps(nextProps: any, nextState: any) {
    console.log('========= child getDerivedStateFromProps=========')
    // console.log(nextProps, nextState)
    return null
  }

  componentDidMount() {
    console.log('child componentDidMount')
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  shouldComponentUpdate(nextProps: any, nextState: any) {
    console.log('child shouldComponentUpdate')
    return true
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getSnapshotBeforeUpdate(prevProps: any, prevState: any) {
    console.log('child getSnapshotBeforeUpdate')
    return null
  }

  componentDidUpdate() {
    console.log('child componentDiUpdate')
  }

  componentWillUnmount() {
    console.log('child componentWillUnmount')
  }

  changeCount() {
    const { count } = this.state
    this.setState(prev => ({
      ...prev,
      count: count + 1,
    }))
  }

  render() {
    console.log('child render')
    return (
      <div>
        <h3>child组件</h3>
        <p>父组件状态：{this.props.num}</p>
        <p>子组件自身状态：{this.state.count}</p>
        <Button onClick={this.changeCount}>改变自身状态</Button>
      </div>
    )
  }
}

export default Parent
