import superagent from 'superagent'

export class CheckUrls {
  constructor(urls) {
    this.urls = urls
  }

  async *[Symbol.asyncIterator]() {
    for (const url of this.urls) {
      try {
        const checkResult = await superagent.head(url).redirects(2)
        yield `${url} is up, status: ${checkResult.status}`
      } catch (error) {
        yield `${url} is down, error: ${error.message}`
      }
    }
  }
}

async function main() {
  const urls = [
    'https://google.com',
    'https://nodejsdesignpatterns.com',
    'https://mustbedownfoshomahman.com'
  ]

  const checkUrls = new CheckUrls(urls)

  for await (const result of checkUrls) {
    console.log(result)
  }
}

main()
