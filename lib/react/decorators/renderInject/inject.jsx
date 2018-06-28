import injectProps from './injectProps'

export default function inject(type) {
  if (type === 'props') {
    return (...args) => injectProps(...args)
  }

  return (Component, name, descriptor) => {
    const oldFunc = descriptor.value
    let value;
    if (type === 'args') {
      value = function argInjector({ ...args }) {
        const props = {
          ...this.props,
          ...args,
        }

        return oldFunc.bind(this)(props)
      }
    }

    if (type === 'state') {
      value = function stateInjector() {
        return oldFunc.bind(this)(this.state)
      }
    }

    if (Array.isArray(type)) {
      if (type.filter(prop => prop !== 'args').length === 2) {
        value = function InjectorFunction() {
          return oldFunc.bind(this)({ ...this.props, ...this.state })
        }
      }
    }

    return {
      ...descriptor,
      value,
    }
  }
}
