// 使用Promise实现红路灯交替重复亮

function red() {
  console.log('red')
}
function green() {
  console.log('green')
}
function yellow() {
  console.log('yellow')
}

const wait = (fn, time) => {
  return new Promise(resolve => {
    fn()
    setTimeout(resolve, time)
  })
}

const exec = () => {
  Promise.resolve()
    .then(() => {
      return wait(red, 3000)
    })
    .then(() => {
      return wait(green, 2000)
    })
    .then(() => {
      return wait(yellow, 1000)
    })
    .then(() => {
      return exec()
    })
}

export default exec
