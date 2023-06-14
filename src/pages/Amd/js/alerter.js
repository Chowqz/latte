/* eslint-disable */
define(['dataService'], function (dataService) {
  let name = 'dataService'
  console.log('print')
  function showMsg() {
    console.log(dataService.getMsg() + ', ' + name)
  }
  return { showMsg }
})
