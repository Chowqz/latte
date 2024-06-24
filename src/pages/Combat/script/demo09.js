// 模拟调用api接口获取计算结果
const addRemote = (a, b) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(a + b)
    }, 500)
  })
}

// 节约时间、支持缓存
async function add(...args) {
  console.log(args)
  if (args.length < 2) {
    throw new Error('arguments error')
  }
  let total = undefined
  const taskList = []
  const cache = new Map()

  const execAdd = (a, b) => {
    const key = [a, b].sort().join('+')
    if (cache.has(key)) {
      return cache.get(key)
    }
    return addRemote(a, b).then(res => {
      cache.set(key, res)
      if (typeof total === 'undefined') {
        total = res
        return res
      }
      const num = total
      total = undefined
      return execAdd(res, num)
    })
  }

  while (args.length > 0) {
    const a = args.shift()
    const b = args.shift()
    if (typeof b === 'undefined') {
      total = a
      break
    }
    const task = execAdd(a, b)
    taskList.push(task)
  }
  const res = await Promise.all(taskList)
  console.log(cache)
  console.log(res)
  return total
}

add(1).then(console.log)
add(1, 2).then(console.log)
add(1, 2, 3).then(console.log)
add(1, 2, 3, 4).then(console.log)
add(1, 2, 3, 4, 5).then(console.log)
add(1, 2, 3, 4, 5, 6).then(console.log)
add(1, 2, 3, 4, 5, 6, 7).then(console.log)
add(1, 2, 3, 4, 5, 6, 7, 8).then(console.log)

add(2, 3, 3, 2, 3, 2, 7, 8).then(console.log)
