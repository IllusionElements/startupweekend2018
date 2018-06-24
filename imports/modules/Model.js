
import SimpleSchema from 'simpl-schema'

export default class Model {
  static init() {
    return new this()
  }
}
const Schemas = new WeakMap()
class SchemaBuilder {
  static schemas = new Map()

  static registerSchema(model) {
    const schema = new SimpleSchema(model)
    Schemas.set(this, { schema, model })
    return schema
  }

  static register(model, collection, schema) {
    const _schema = schema !== null ? schema : this.RegisterSchema(model) // eslint-disable-line
    return this.setSchema(collection, _schema)
  }

  static setSchema(collection) {
    const { schema, model } = Schemas.get(this)
    console.log(collection, schema)
    const schemaSet = collection.attachSchema(schema)
    this.schemas.set(model, schema)

    return schemaSet
  }
}

export class Schema {
  constructor(model, collection, fn) {
    this.collection = collection
    if (fn && !model) {
      const schema = fn(SchemaBuilder)
      this._schema = schema.schema // eslint-disable-line
      this.Schema = schema.collection
    } else {
      this.Schema = SchemaBuilder.register(model, collection)
      this._schema = SchemaBuilder.schemas.get(model) // eslint-disable-line
    }
  }
}
