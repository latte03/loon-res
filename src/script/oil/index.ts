// #v-ifdef DEV
import { $done, $httpClient, $notification, $persistentStore } from '../../utils/loon'
// #v-endif
import { notification } from '../../utils/notification'

const defaultProvName = '浙江'
const provName = ($persistentStore.read('省份') as string) || defaultProvName
//默认江苏油价
const encodedProvName = encodeURIComponent(provName)
const apiUrls = [
  `https://apis.tianapi.com/oilprice/index?key=231de491563c35731436829ac52aad43&prov=${encodedProvName}`,
  `https://apis.tianapi.com/oilprice/index?key=a2bc7a0e01be908881ff752677cf94b7&prov=${encodedProvName}`,
  `https://apis.tianapi.com/oilprice/index?key=1bcc67c0114bc39a8818c8be12c2c9ac&prov=${encodedProvName}`,
  `https://apis.tianapi.com/oilprice/index?key=3c5ee42145c852de4147264f25b858dc&prov=${encodedProvName}`,
  `https://apis.tianapi.com/oilprice/index?key=d718b0f7c2b6d71cb3a9814e90bf847f&prov=${encodedProvName}`
]
let currentIndex = 0

if (typeof $httpClient !== 'undefined') {
  testNextUrl()
} else {
  console.log('Unsupported execution environment!')
  $done()
}

function testNextUrl() {
  if (currentIndex >= apiUrls.length) {
    console.log('All URLs failed')
    $done()
    return
  }

  const apiUrl = apiUrls[currentIndex]
  const request = { url: apiUrl }

  if (typeof $httpClient !== 'undefined') {
    $httpClient.get(request, function (error, response, data) {
      if (error) {
        console.log(`Error for URL ${currentIndex + 1}: ${error}`)
        currentIndex++
        testNextUrl()
      } else {
        handleResponse(data)
      }
    })
  }
}

function handleResponse(data: any) {
  var obj = JSON.parse(data)

  if (obj.code === 200) {
    var prov = obj.result.prov
    var p0 = '⛽️0号柴油: ' + '¥' + obj.result.p0
    var p92 = '⛽️92号汽油: ' + '¥' + obj.result.p92 + '\n'
    var p95 = '⛽️95号汽油: ' + '¥' + obj.result.p95 + '\n'
    var p98 = '⛽️98号汽油: ' + '¥' + obj.result.p98 + '\n'
    var time = obj.result.time

    if (typeof $notification !== 'undefined') {
      notification(prov + '油价提醒', time, p92 + p95 + p98 + p0)
    }
    $done()
  } else {
    console.log(`请求失败，错误信息：${obj.msg}`)
    currentIndex++
    testNextUrl()
  }
}
