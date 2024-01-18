import { UrlBuilder } from './urlBuilder.mjs'

const url = new UrlBuilder()
  .setProtocol('https')
  .setAuthentication('user', 'pass')
  .setHostname('example.com')
  .setPort(8080)
  .setPath('/path/to/resource')
  .setParams('key1=value1;key2=value2')
  .setHash('hash')
  .build()
console.log(url)
