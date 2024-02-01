import { promises as fsPromises } from 'fs'
import ini from 'ini'
import objectPath from 'object-path'

class ConfigTemplate {
  async load(file) {
    console.log(`Deserializing from ${file}`)
    this.data = this._deserialize(await fsPromises.readFile(file, 'utf-8'))
  }

  async save(file) {
    console.log(`Serializing to ${file}`)
    await fsPromises.writeFile(file, this._serialize(this.data))
  }

  get(path) {
    return objectPath.get(this.data, path)
  }

  set(path, value) {
    return objectPath.set(this.data, path, value)
  }

  _serialize() {
    throw new Error('_serialize() must be implemented')
  }

  _deserialize() {
    throw new Error('_deserialize() must be implemented')
  }
}

export class JsonConfig extends ConfigTemplate {
  _serialize(data) {
    return JSON.stringify(data, null, 2)
  }

  _deserialize(data) {
    return JSON.parse(data)
  }
}

export class IniConfig extends ConfigTemplate {
  _deserialize(data) {
    return ini.parse(data)
  }

  _serialize(data) {
    return ini.stringify(data)
  }
}

async function main() {
  const jsonConfig = new JsonConfig()
  await jsonConfig.load('samples/conf.json')
  jsonConfig.set('nodejs', 'design patterns')
  await jsonConfig.save('conf_mod.json')

  const iniConfig = new IniConfig()
  await iniConfig.load('samples/conf.ini')
  iniConfig.set('nodejs', 'design patterns')
  await iniConfig.save('conf_mod.ini')
}

main()
