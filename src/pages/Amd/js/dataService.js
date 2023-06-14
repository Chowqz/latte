/* eslint-disable */
define(function () {
  let msg = 'test'
  console.log('dataService')
  function getMsg() {
    return msg.toUpperCase()
  }
  return { getMsg }
})
