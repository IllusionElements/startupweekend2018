import SimpleSchema from 'simpl-schema'

export default class Model {
  static init() {
    return new this()
  }
}

export class Schema {
  static register = model => (
    new SimpleSchema(model.init())
  )
}
