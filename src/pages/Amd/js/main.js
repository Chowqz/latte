/* eslint-disable */
// main.js文件
;(function () {
  require.config({
    baseUrl: 'js/',
    paths: {
      alerter: 'alerter',
      dataService: 'dataService',
    },
  })
  require(['alerter'], function (alerter) {
    console.log('main')
    alerter.showMsg()
  })
})()
