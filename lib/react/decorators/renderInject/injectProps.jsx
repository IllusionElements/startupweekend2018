export default function injectProps(target, name, descriptor) {
  const oldFunction = descriptor.value

  const value = function propsInjectorFunction() {
    return oldFunction.bind(this)(this.props)
  }

  return {
    ...descriptor,
    value,
  }
}
