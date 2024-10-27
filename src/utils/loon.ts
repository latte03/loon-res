export { default as $httpClient } from './requet'

export function $done(params?: any) {
  console.log('🍎 done ', '')
}

export const $notification = {
  /**
   *
   * @param title 标题
   * @param subtitle 副标题
   * @param content 通知内容
   * @param attach 通知的附件 通知带的一个图片\视频url或者点击通知时的触发的openurl
   */
  post(title: string, subtitle: string, content: string, attach?: string) {
    console.log(`${title}\n${subtitle}${content}`, attach ? attach : '')
  }
}

export const $persistentStore = {
  read(key: string): any {
    console.log(`persistentStore read ${key}`)
    return
  },
  write(value: string, key: string) {
    console.log(`persistentStore write  key:${key} value:${value}`)

    return true
  },

  remove() {
    console.log(`persistentStore remove`)
  }
}
