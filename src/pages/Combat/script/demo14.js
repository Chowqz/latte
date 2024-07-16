// requestIdleCallback的回调函数在每一帧空闲的时候执行，如果每一帧没有空闲下来，有可能执行不到

const sleep = delay => {
  for (let i = Date.now(); Date.now() - i <= delay;) {
    // do something
  }
}

const taskList = [
  () => {
    console.log('task 01')
    sleep(50)
  },
  () => {
    console.log('task 02')
    sleep(50)
  },
  () => {
    console.log('task 03')
    sleep(50)
  },
]

function runTask(deadline) {
  console.log(`deadline: ${deadline.timeRemaining()}`)
  while (
    (deadline.timeRemaining() > 0 || deadline.didTimeout) &&
    taskList.length
  ) {
    const task = taskList.shift()
    task()
  }
  if (taskList.length) {
    requestIdleCallback(runTask, {
      timeout: 1000,
    })
  }
}

requestIdleCallback(runTask, {
  timeout: 1000,
})
