function f(n, e, o, c) {
  $notification.post(n, e, o, c), console.log(`${n}
${e}
${o}
`);
}
const $ = "浙江", u = $persistentStore.read("省份") || $, t = encodeURIComponent(u), a = [
  `https://apis.tianapi.com/oilprice/index?key=231de491563c35731436829ac52aad43&prov=${t}`,
  `https://apis.tianapi.com/oilprice/index?key=a2bc7a0e01be908881ff752677cf94b7&prov=${t}`,
  `https://apis.tianapi.com/oilprice/index?key=1bcc67c0114bc39a8818c8be12c2c9ac&prov=${t}`,
  `https://apis.tianapi.com/oilprice/index?key=3c5ee42145c852de4147264f25b858dc&prov=${t}`,
  `https://apis.tianapi.com/oilprice/index?key=d718b0f7c2b6d71cb3a9814e90bf847f&prov=${t}`
];
let i = 0;
typeof $httpClient < "u" ? r() : (console.log("Unsupported execution environment!"), $done());
function r() {
  if (i >= a.length) {
    console.log("All URLs failed"), $done();
    return;
  }
  const e = { url: a[i] };
  typeof $httpClient < "u" && $httpClient.get(e, function(o, c, p) {
    o ? (console.log(`Error for URL ${i + 1}: ${o}`), i++, r()) : v(p);
  });
}
function v(n) {
  var e = JSON.parse(n);
  if (e.code === 200) {
    var o = e.result.prov, c = "⛽️0号柴油: ¥" + e.result.p0, p = "⛽️92号汽油: ¥" + e.result.p92 + `
`, s = "⛽️95号汽油: ¥" + e.result.p95 + `
`, l = "⛽️98号汽油: ¥" + e.result.p98 + `
`, d = e.result.time;
    typeof $notification < "u" && f(o + "油价提醒", d, p + s + l + c), $done();
  } else
    console.log(`请求失败，错误信息：${e.msg}`), i++, r();
}
