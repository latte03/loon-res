// #v-ifdef DEV
import { $done, $httpClient, $persistentStore } from '../../utils/loon'
// #v-endif
import { notification } from '../../utils/notification'

const topMap: Record<string, number> = {
  '巅峰榜·流行指数': 4,
  '巅峰榜·热歌': 26,
  国乐榜: 78,
  '巅峰榜·新歌': 27,
  飙升榜: 62,
  说唱榜: 58,
  电音榜: 57,
  '巅峰榜·网络歌曲': 28,
  '巅峰榜·内地': 5,
  '巅峰榜·欧美': 3,
  香港地区榜: 59,
  '巅峰榜·韩国': 16,
  抖音热歌榜: 60,
  '巅峰榜·影视金曲': 29,
  '巅峰榜·日本': 17,
  '巅峰榜·MV': 201,
  '巅峰榜·腾讯音乐人原创榜': 52,
  '巅峰榜·K歌金曲': 36,
  台湾地区榜: 61,
  DJ舞曲榜: 63,
  综艺新歌榜: 64,
  国风热歌榜: 65,
  听歌识曲榜: 67,
  动漫音乐榜: 72,
  游戏音乐榜: 73,
  有声榜: 75
}

const defaultTopType = '巅峰榜·流行指数'

const topType = ($persistentStore.read('榜单类型') as string) || defaultTopType

const topTypeId = topMap[topType]

const url = `https://i.y.qq.com/n2/m/share/details/toplist.html?ADTAG=ryqq.toplist&type=0&id=${topTypeId}`

const headers = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

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

function main() {
  $httpClient.get(
    {
      url,
      headers: headers
    },
    (errorMsg, res, data) => {
      if (errorMsg) {
        notification(`QQ音乐${topType}:请求错误`, '', errorMsg)
        return
      }
      if (!data) return
      const htmlSnippet = data
      const parsedData = getPageData(htmlSnippet)
      const songCount = Number(($persistentStore.read('songCount') as string) || '10')
      const song = (parsedData.toplistData.song as Song[]).slice(0, songCount)
      const content = song
        .map((s: Song) => {
          return `${s.rank}、${s.title} - ${s.singerName}`
        })
        .join('\n ')
      notification(`QQ音乐${topType}`, '', content)

      $done()
    }
  )
}

main()
