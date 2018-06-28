Meteor.startup(() => {
  const idx = (prop, f) => {
    try {
      return f(prop)
    } catch (e) {
      return false
    }
  }

  function get() {
    import('./main').then(({ default: def }) => def.forEach(d => idx(this, _ => _.insert(d))))
  }

  import('meteor/mongo').then(({ Mongo }) => Mongo.Collection.get('keywords', get))
})
