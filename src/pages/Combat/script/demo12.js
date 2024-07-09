// promoise并发控制

const asyncPool = async (taskList, limit) => {
  const result = []
  const taskPool = []
  let i = 0

  const execFn = async (task, index) => {
    try {
      const res = await task()
      result[index] = res
      if (i < taskList.length) {
        const newTask = execFn(taskList[i], i)
        i++
        return newTask
      }
    } catch (err) {
      result[index] = err
      if (i < taskList.length) {
        const newTask = execFn(taskList[i], i)
        i++
        return newTask
      }
    }
  }
  while (i < limit && i < taskList.length) {
    taskPool.push(execFn(taskList[i], i))
    i++
  }
  console.log(taskPool)
  await Promise.all(taskPool)
  return result
}

const taskList = [1, 2, 3, 4, 5].map(item => {
  return () => {
    if (item === 5) {
      console.log(item)
      return item * 2
    }
    return new Promise((resolve, reject) => {
      const time = Math.round(Math.random() * 1000)
      setTimeout(() => {
        console.log(item)
        if (item % 2 === 0) {
          resolve(item)
        } else {
          reject(new Error(item))
        }
      }, time)
    })
  }
})

asyncPool(taskList, 10)
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log(err)
  })
