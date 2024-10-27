function l(o, e, t, n) {
  $notification.post(o, e, t, n), console.log(`${o}
${e}
 ${t}
`);
}
const g = {
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
}, f = "巅峰榜·流行指数", c = $persistentStore.read("榜单类型") || f, $ = g[c], m = `https://i.y.qq.com/n2/m/share/details/toplist.html?ADTAG=ryqq.toplist&type=0&id=${$}`, h = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
};
function u(o) {
  const e = /firstPageData\s*=\s*({[^;]+});?/, t = o.match(/<script>([\s\S]*?)<\/script>/g);
  let n;
  if (t)
    for (let r of t) {
      let s = r.match(e);
      if (s) {
        const p = s[1];
        try {
          n = JSON.parse(p);
        } catch (i) {
          console.error("JSON 格式化错误:", i);
        }
        break;
      }
    }
  else
    console.log("没有匹配上的值.");
  return n;
}
function d() {
  $httpClient.get(
    {
      url: m,
      headers: h
    },
    (o, e, t) => {
      if (o) {
        l(`QQ音乐${c}:请求错误`, "", o);
        return;
      }
      if (!t) return;
      const r = u(t), s = Number($persistentStore.read("songCount") || "10"), i = r.toplistData.song.slice(0, s).map((a) => `${a.rank}、${a.title} - ${a.singerName}`).join(`
 `);
      l(`QQ音乐${c}`, "", i), $done();
    }
  );
}
d();
