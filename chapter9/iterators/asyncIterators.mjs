import superagent from 'superagent'

export class CheckUrls {
  constructor(urls) {
    this.urls = urls
  }

  [Symbol.asyncIterator]() {
    const urlsIterator = this.urls[Symbol.iterator]()

    return {
      async next() {
        const iteratorResult = urlsIterator.next()
        if (iteratorResult.done) {
          return { done: true }
        }
        const url = iteratorResult.value
        try {
          const checkResult = await superagent.head(url).redirects(2)
          return {
            done: false,
            value: `${url} is up, status: ${checkResult.status}`
          }
        } catch (error) {
          return {
            done: false,
            value: `${url} is down, error: ${error.message}`
          }
        }
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
