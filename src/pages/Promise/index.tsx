import React from 'react'

const getInfo = () =>
  new Promise((resolve, reject) => {
    // throw 'dsada'
    setTimeout(() => {
      reject(new Error('error'))
    }, 100)
  })

const init = async () => {
  try {
    await getInfo()
    return 'success'
  } catch (err) {
    console.log(err)
    return 'fail'
  }
}

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
  init().then(res => {
    console.log('init success: ' + res)
  })
  // .catch(console.log)
  return <div>index</div>
}

export default Index
