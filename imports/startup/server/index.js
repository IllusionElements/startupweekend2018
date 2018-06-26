Meteor.startup(() => {
  const idx = (prop, f) => {
    try {
      const x = f(prop)
      console.log(x)
      return x
    } catch(e) {
      return false
    }
  }

Mongo
  .Collection
  .get('keywords', function get() {
    console.log(this)
    import('./main').then(({ default: def }) => def.forEach(d => idx(this, _ => _.insert(d))))
  })
})