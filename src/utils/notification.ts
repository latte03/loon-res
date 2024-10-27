// #v-ifdef DEV
import { $notification } from './loon'
// #v-endif

export function notification(title: string, subtitle: string, content: string, attach?: string) {
  $notification.post(title, subtitle, content, attach)

  console.log(`${title}\n${subtitle}\n ${content}\n`)
  if (attach) {
    console.log(attach)
  }
}
