import { SchemaDirectiveVisitor } from 'graphql-tools';

export default class HTTPDirective extends SchemaDirectiveVisitor {
  public visitFieldDefinition(field: any) {
    const { url } = this.args

    field.resolve = () => (
      import('./httpFetch').then(({ default: Fetch }) => (
       Fetch.call('get', url)
    ))
  )}
}