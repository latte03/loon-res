// import axios from 'axios';

// class HttpClient {
//   get(params, fn) {
//     const { url, ...others } = params;
//     axios.get(url, others).then((res) => {
//       fn(null, res, res.data);
//     }).catch((error) => {
//       fn(error, void 0, void 0);
//     });
//   }
// }
// const $httpClient = new HttpClient();

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
  (errormsg, res, data) => {
    const htmlSnippet = data
    const parsedData = getPageData(htmlSnippet)
    const song = parsedData.toplistData.song.slice(0, 10)
    const content = song
      .map((s) => {
        return `${s.rank}\u3001${s.title} - ${s.singerName}`
      })
      .join('\n')
    console.log(content)
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
