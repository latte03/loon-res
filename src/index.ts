// import axios from 'axios'
import $httpClient from './requet'

// const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
const url2 = `https://i.y.qq.com/n2/m/share/details/toplist.html?ADTAG=ryqq.toplist&type=0&id=${27}`

const headers = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

$httpClient.get(
  {
    url: url2,
    headers: headers
  },
  (errormsg, res, data) => {
    const htmlSnippet = data
    const parsedData = getPageData(htmlSnippet)
    const song = (parsedData.toplistData.song as Song[]).slice(0, 10)
    const content = song
      .map((s: Song) => {
        return `${s.rank}、${s.title} - ${s.singerName}`
      })
      .join('\n')
    console.log(content)
  }
)

interface Song {
  rank: number
  rankType: number
  rankValue: string
  recType: number
  songId: number
  vid: string
  albumMid: string
  title: string
  singerName: string
  singerMid: string
  songType: number
  uuidCnt: number
  cover: string
  mvid: number
}

function getPageData(htmlSnippet: string) {
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
          console.error('JSON 格式化错误:', error)
        }
        break // 一旦找到就停止搜索
      }
    }
  } else {
    console.log('没有匹配上的值.')
  }

  return parsedData
}
