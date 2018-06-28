
export default {
  Query: {
    keywordsList(_, args, { db: { keywords } }, ast) {
      const query = keywords.astToQuery(ast, {
        embody({ body }) {
          this.$filters = Object.assign({}, body, args)
        },
      })

      return query.fetch()
    },
  },
}
