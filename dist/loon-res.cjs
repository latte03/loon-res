'use strict';

const url2 = `https://i.y.qq.com/n2/m/share/details/toplist.html?ADTAG=ryqq.toplist&type=0&id=${27}`;
const headers = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
};
$httpClient.get(
  {
    url: url2,
    headers
  },
  (errorMsg, res, data) => {
    if (errorMsg) {
      $notification.post("QQ音乐热歌榜:请求错误", "", errorMsg);
      return;
    }
    if (!data) return;
    const htmlSnippet = data;
    const parsedData = getPageData(htmlSnippet);
    const songCount = Number($persistentStore.read("songCount") || "10");
    const song = parsedData.toplistData.song.slice(0, songCount);
    const content = song.map((s) => {
      return `${s.rank}、${s.title} - ${s.singerName}`;
    }).join("\n");
    $notification.post("QQ音乐热歌榜", "", content);
    $done();
  }
);
function getPageData(htmlSnippet) {
  const regex = /firstPageData\s*=\s*({[^;]+});?/;
  const scriptTags = htmlSnippet.match(/<script>([\s\S]*?)<\/script>/g);
  let parsedData;
  if (scriptTags) {
    for (let script of scriptTags) {
      let match = script.match(regex);
      if (match) {
        const jsonData = match[1];
        try {
          parsedData = JSON.parse(jsonData);
        } catch (error) {
          console.error("JSON 格式化错误:", error);
        }
        break;
      }
    }
  } else {
    console.log("没有匹配上的值.");
  }
  return parsedData;
}
