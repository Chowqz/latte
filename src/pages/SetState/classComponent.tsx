import React from 'react'
import Child from './Child'

// 针对react 17及以前版本
// 在正常的react的事件流里（如onClick等）：
// setState和useState是异步执行的（不会立即更新state的结果）
// 多次执行setState和useState，只会调用一次重新渲染render
// 不同的是，setState会进行state的合并，而useState则不会

// 在setTimeout，Promise.then等异步事件中：
// setState和useState是同步执行的（立即更新state的结果）
// 多次执行setState和useState，每一次的执行setState和useState，都会调用一次render

// react 18及以后版本，都是异步执行，合并更新

class ClassComponent extends React.Component {
  state = {
    count: 0,
    num: 0,
  }
  constructor(props: any) {
    super(props)

    this.handleReactEvent = this.handleReactEvent.bind(this)
    this.handleNativeEvent = this.handleNativeEvent.bind(this)
  }

  handleReactEvent() {
    this.setState({
      count: this.state.count + 1,
    })
    this.setState({
      count: this.state.count + 1,
    })
    console.log('合成点击事件：' + this.state.count)
  }

  handleNativeEvent() {
    this.setState({
      num: this.state.num + 1,
    })
    this.setState({
      num: this.state.num + 1,
    })
    console.log('原生点击事件：' + this.state.num)
  }

  componentDidMount() {
    document
      .querySelector('#btn')
      ?.addEventListener('click', this.handleNativeEvent)
  }

  render() {
    console.log('render')
    return (
      <>
        <div>{this.state.count}</div>
        <Child num={this.state.num} />

        <button onClick={this.handleReactEvent}>react click event</button>
        <button id="btn">native click event</button>
      </>
    )
  }
}

export default ClassComponent
