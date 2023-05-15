import React from 'react'

const func = (i: number) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(i)
    }, i)
  })

const Index = () => {
  // const getData = async () => {
  //   try {
  //     const res = await init()
  //     console.log('init success: ' + res)
  //   } catch (err) {
  //     console.log('init err: ' + err)
  //   }
  // }
  // getData()
  // init().then(res => {
  //   console.log('init success: ' + res)
  // })
  // .catch(console.log)

  const test = async () => {
    const arr = [1000, 2000, 3000, 4000, 5000]

    // for (const item of arr) {
    //   try {
    //     console.time()
    //     const res = await func(item)
    //     console.log(res)
    //     console.timeEnd()
    //   } catch (e) {}
    // }

    while (arr.length) {
      try {
        const item = arr.shift()
        console.time()
        const res = await func(item!)
        console.log(res)
        console.timeEnd()
      } catch (e) {}
    }
    console.log('loop end')
  }

  test()
  return <div>index</div>
}

export default Index
