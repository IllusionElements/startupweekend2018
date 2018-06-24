
import SimpleSchema from 'simpl-schema'

export default class Model {
  static init() {
    return new this()
  }
}

class SchemaBuilder {
  static register(model, collection) {
    const schema = new SimpleSchema(model)

    return collection.attachSchema(schema)
  }
}

export class Schema {
  constructor(model, collection) {
    this.collection = collection
    this.Schema = SchemaBuilder.register(model, collection)
  }
}
