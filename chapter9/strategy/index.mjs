import { promises as fs } from 'fs'
import ini from 'ini'
import objectPath from 'object-path'

class Config {
  constructor(formatStrategy) {
    this.data = {}
    this.formatStrategy = formatStrategy
  }

  get(path) {
    return objectPath.get(this.data, path)
  }

  set(path, value) {
    return objectPath.set(this.data, path, value)
  }

  async load(filePath) {
    console.log('Deserializing from', filePath)
    this.data = this.formatStrategy.deserialize(
      await fs.readFile(filePath, 'utf-8')
    )
  }

  async save(filePath) {
    console.log('Serializing to', filePath)
    await fs.writeFile(filePath, this.formatStrategy.serialize(this.data))
  }
}

const iniStrategy = {
  deserialize: (data) => {
    return ini.parse(data)
  },
  serialize: (data) => {
    return ini.stringify(data)
  }
}

const jsonStrategy = {
  deserialize: (data) => {
    return JSON.parse(data)
  },
  serialize: (data) => {
    return JSON.stringify(data, null, 2)
  }
}

async function main() {
  const iniConfig = new Config(iniStrategy)
  await iniConfig.load('samples/conf.ini')
  iniConfig.set('book.nodejs', 'design patterns')
  await iniConfig.save('conf_mod.ini')

  const jsonConfig = new Config(jsonStrategy)
  await jsonConfig.load('samples/conf.json')
  jsonConfig.set('book.nodejs', 'design patterns')
  await jsonConfig.save('conf_mod.json')
}

main()
