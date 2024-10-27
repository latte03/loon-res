const l = {
  "巅峰榜·流行指数": 4,
  "巅峰榜·热歌": 26,
  国乐榜: 78,
  "巅峰榜·新歌": 27,
  飙升榜: 62,
  说唱榜: 58,
  电音榜: 57,
  "巅峰榜·网络歌曲": 28,
  "巅峰榜·内地": 5,
  "巅峰榜·欧美": 3,
  香港地区榜: 59,
  "巅峰榜·韩国": 16,
  抖音热歌榜: 60,
  "巅峰榜·影视金曲": 29,
  "巅峰榜·日本": 17,
  "巅峰榜·MV": 201,
  "巅峰榜·腾讯音乐人原创榜": 52,
  "巅峰榜·K歌金曲": 36,
  台湾地区榜: 61,
  DJ舞曲榜: 63,
  综艺新歌榜: 64,
  国风热歌榜: 65,
  听歌识曲榜: 67,
  动漫音乐榜: 72,
  游戏音乐榜: 73,
  有声榜: 75
}, g = "巅峰榜·流行指数", a = $persistentStore.read("榜单类型") || g, f = l[a], m = `https://i.y.qq.com/n2/m/share/details/toplist.html?ADTAG=ryqq.toplist&type=0&id=${f}`, h = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
};
function $(e) {
  const c = /firstPageData\s*=\s*({[^;]+});?/, t = e.match(/<script>([\s\S]*?)<\/script>/g);
  let n;
  if (t)
    for (let s of t) {
      let o = s.match(c);
      if (o) {
        const p = o[1];
        try {
          n = JSON.parse(p);
        } catch (r) {
          console.error("JSON 格式化错误:", r);
        }
        break;
      }
    }
  else
    console.log("没有匹配上的值.");
  return n;
}
function u() {
  $httpClient.get(
    {
      url: m,
      headers: h
    },
    (e, c, t) => {
      if (e) {
        $notification.post(`QQ音乐${a}:请求错误`, "", e);
        return;
      }
      if (!t) return;
      const s = $(t), o = Number($persistentStore.read("songCount") || "10"), r = s.toplistData.song.slice(0, o).map((i) => `${i.rank}、${i.title} - ${i.singerName}`).join(`
`);
      $notification.post(`QQ音乐${a}`, "", r), $done();
    }
  );
}
u();
