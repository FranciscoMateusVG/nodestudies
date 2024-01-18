export class Url {
  constructor(
    protocol,
    username,
    password,
    hostname,
    port,
    path,
    params,
    hash
  ) {
    this.protocol = protocol
    this.username = username
    this.password = password
    this.hostname = hostname
    this.port = port
    this.path = path
    this.params = params
    this.hash = hash
    this.validate()
  }

  validate() {
    if (!this.protocol) {
      throw new Error('URL must have a protocol')
    }
    if (!this.hostname) {
      throw new Error('URL must have a hostname')
    }
  }

  toString() {
    let url = `${this.protocol}://`
    if (this.username) {
      url += `${this.username}:${this.password}@`
    }
    url += this.hostname
    if (this.port) {
      url += `:${this.port}`
    }
    url += this.path
    if (this.params) {
      url += `;${this.params}`
    }
    if (this.hash) {
      url += `#${this.hash}`
    }
    return url
  }
}

export class UrlBuilder {
  setProtocol(protocol) {
    this.protocol = protocol
    return this
  }

  setAuthentication(username, password) {
    this.username = username
    this.password = password
    return this
  }

  setHostname(hostname) {
    this.hostname = hostname
    return this
  }

  setPort(port) {
    this.port = port
    return this
  }

  setPath(path) {
    this.path = path
    return this
  }

  setHash(hash) {
    this.hash = hash
    return this
  }

  setParams(params) {
    this.params = params
    return this
  }

  build() {
    return new Url(
      this.protocol,
      this.username,
      this.password,
      this.hostname,
      this.port,
      this.path,
      this.params,
      this.hash
    )
  }
}
