import axios from 'axios'

class HttpClient {
  get(params, fn) {
    const { url, ...others } = params

    axios
      .get(url, others)
      .then((res) => {
        fn(null, res, res.data)
      })
      .catch((error) => {
        fn(error, undefined, undefined)
      })
  }
}

const $httpClient = new HttpClient()

export default $httpClient
