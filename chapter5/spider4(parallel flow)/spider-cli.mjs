import { spider } from './webspider3.mjs'

const url = process.argv[2]
const nesting = Number.parseInt(process.argv[3], 10) || 1
console.log('url: ', url)
console.log('nesting: ', nesting)
spider(url, nesting)
  .then(() => console.log('Download complete'))
  .catch((err) => console.log(err))

// nodemon spider-cli.mjs https://www.construtoraquebec.com.br/index.html 1
