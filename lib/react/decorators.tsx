// @flow
import EventEmitter from 'events'
import React from 'react'

// types
type Store = {
  Provider?: any,
  emitter?: EventEmitter,
}

const getDisplayName = (WrappedComponent) => (
  WrappedComponent.displayName || WrappedComponent.name || 'Component'
)

export const setDisplayName = (displayName) => (Component) => {
  Component.displayName = displayName
  return Component
}

export const assignStatic = (HoC) => (WrappedComponent) => {
  const def = ['prototype', 'name', 'constructor']
  const WrappedHoC = HoC(WrappedComponent)
  Object
    .getOwnPropertyNames(WrappedComponent)
      .filter((name) => !def.includes(name))
      .forEach((name) => WrappedHoC[name] = WrappedComponent[name])
  return WrappedHoC
}

export const connect = ({
    state = {},
    displayName = null,
    Store = {}
  }: {
    state: any,
    displayName?: string,
    Store: Store,
  }) => (WrappedComponent) => (
    class WithStore extends React.PureComponent {
      static displayName = `WithStore${displayName || getDisplayName(WrappedComponent)}`
      state = state

      render() {
        const emitter = Store.emitter || null
        return (
          <Store.Provider value={this.state}>
            <WrappedComponent {...this.props} store={emitter}/>
          </Store.Provider>
        )
      }
    }
  )