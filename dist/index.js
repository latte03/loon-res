// import axios from 'axios';

// class HttpClient {
//   get(params, fn) {
//     const { url, ...others } = params;
//     axios.get(url, others).then((res) => {
//       fn(void 0, res, res.data);
//     }).catch((error) => {
//       fn(error, void 0, void 0);
//     });
//   }
// }
// const $httpClient = new HttpClient();

// const $notification = {
//   /**
//    *
//    * @param title 标题
//    * @param subtitle 副标题
//    * @param content 通知内容
//    * @param attach 通知的附件 通知带的一个图片\视频url或者点击通知时的触发的openurl
//    */
//   post(title, subtitle, content, attach) {
//     console.log(`${title}
// ${subtitle}${content}`, attach ? attach : "");
//   }
// };

const url2 = `https://i.y.qq.com/n2/m/share/details/toplist.html?ADTAG=ryqq.toplist&type=0&id=${27}`
const headers = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}
$httpClient.get(
  {
    url: url2,
    headers
  },
  (errorMsg, res, data) => {
    if (errorMsg) {
      $notification.post('QQ\u97F3\u4E50\u70ED\u6B4C\u699C:\u8BF7\u6C42\u9519\u8BEF', '', errorMsg)
      return
    }
    if (!data) return
    const htmlSnippet = data
    const parsedData = getPageData(htmlSnippet)
    const songCount = Number('10')
    const song = parsedData.toplistData.song.slice(0, songCount)
    const content = song
      .map((s) => {
        return `${s.rank}\u3001${s.title} - ${s.singerName}`
      })
      .join('\n')
    $notification.post('QQ\u97F3\u4E50\u70ED\u6B4C\u699C', '', content)
  }
)
function getPageData(htmlSnippet) {
  const regex = /firstPageData\s*=\s*({[^;]+});?/
  const scriptTags = htmlSnippet.match(/<script>([\s\S]*?)<\/script>/g)
  let parsedData
  if (scriptTags) {
    for (let script of scriptTags) {
      let match = script.match(regex)
      if (match) {
        const jsonData = match[1]
        try {
          parsedData = JSON.parse(jsonData)
        } catch (error) {
          console.error('JSON \u683C\u5F0F\u5316\u9519\u8BEF:', error)
        }
        break
      }
    }
  } else {
    console.log('\u6CA1\u6709\u5339\u914D\u4E0A\u7684\u503C.')
  }
  return parsedData
}
