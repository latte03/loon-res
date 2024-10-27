const l = "https://i.y.qq.com/n2/m/share/details/toplist.html?ADTAG=ryqq.toplist&type=0&id=27", p = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
};
$httpClient.get(
  {
    url: l,
    headers: p
  },
  (e, a, t) => {
    if (e) {
      $notification.post("QQ音乐热歌榜:请求错误", "", e);
      return;
    }
    if (!t) return;
    const s = g(t), n = Number($persistentStore.read("songCount") || "10"), r = s.toplistData.song.slice(0, n).map((i) => `${i.rank}、${i.title} - ${i.singerName}`).join(`
`);
    $notification.post("QQ音乐热歌榜", "", r), $done();
  }
);
function g(e) {
  const a = /firstPageData\s*=\s*({[^;]+});?/, t = e.match(/<script>([\s\S]*?)<\/script>/g);
  let o;
  if (t)
    for (let s of t) {
      let n = s.match(a);
      if (n) {
        const c = n[1];
        try {
          o = JSON.parse(c);
        } catch (r) {
          console.error("JSON 格式化错误:", r);
        }
        break;
      }
    }
  else
    console.log("没有匹配上的值.");
  return o;
}
