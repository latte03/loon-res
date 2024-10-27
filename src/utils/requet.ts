import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'

class HttpClient {
  get(params: Params, fn: HttpClientCallback) {
    const { url, ...others } = params

    axios
      .get(url, others)
      .then((res) => {
        fn(undefined, res, res.data)
      })
      .catch((error) => {
        fn(error, undefined, undefined)
      })
  }
}

const $httpClient = new HttpClient()

export default $httpClient

interface HttpClientCallback {
  (errorMsg?: string, response?: AxiosResponse<any, any>, data?: string): void
}

interface Params {
  url: string
  timeout?: number //请求超时，单位ms，默认5000ms
  headers?: AxiosRequestConfig['headers']
  body?: string //仅仅在post请求中有效，格式可以是一个json对象、字符串、二进制等
  'body-base64'?: boolean //当有该字段时，会将body当做base64的格式解析成二进制，如果body参数不是base64后的二进制，请不要设定该值（build 612版本后有效）
  node?: string //指定该请求使用哪一个节点或者策略组（可以使节点名称、策略组名称，也可以说是一个Loon格式的节点描述，如：node:"shadowsocksr,example.com,1070,chacha20-ietf,"password",protocol=auth_aes128_sha1,protocol-param=test,obfs=plain,obfs-param=edge.microsoft.com"）
  'binary-mode'?: boolean //请求响应返回二进制格式，默认false
  'auto-redirect'?: boolean //是否自动处理重定向，默认true（build 660+）
  'auto-cookie'?: boolean //是否自动存储并使用cookie，默认true（build 662+）
}
