import React from 'react'
import { inject } from '../renderInject'

export class CreateLoadContext {
  constructor(props) {
    this.props = props
  }

  static providers = new Map()

  static consumers = new Map()

  static getConsumer(key) {
    return this.consumers.get(key)
  }

  createProvider(key, value = this.props.value) {
    const { providers, consumers } = CreateLoadContext
    if (!providers.has(key) || !consumers.has(key)) {
      return null
    }
    const { Provider, Consumer } = React.createContext(value)
    CreateLoadContext.providers.set(key, Provider)
    CreateLoadContext.consumers.set(key, Consumer)

    return Provider
  }
}

export const Loadable = ({
  OnError, OnLoading, onLoad, key = null,
}) => CComponent => (
  class Loader extends React.Component {
    state = {
      loaded: false,
      isLoading: false,
      error: {
        state: {
          error: true,
        },
      },
      Component: null,
    }

    componentDidMount() {
      onLoad()
        .then(Component => this.setState({ loaded: true, Component, isLoading: false }))
        .catch(err => this.setState({
          loaded: true,
          isLoading: false,
          error: {
            state: {
              error: true,
              ...err,
            },
          },
        }))
    }

    @inject(['props', 'state'])
    render({
      loaded, isLoading, error, Component: Loaded, ...props
    }) {
      if (loaded && !!error.state.error) {
        return (
          OnError ? (<OnError error={error.state} />) : (
            <h1>
              {' '}
              {error.state.message}
              {' '}
            </h1>
          )
        )
      }
      if (loaded && !isLoading) {
        if (CComponent) {
          const ContextCreator = new CreateLoadContext({ value: props })
          const Provider = ContextCreator.createProvider(key)
          return (
            <Provider>
              <Loaded>
                <CComponent />
              </Loaded>
            </Provider>
          )
        }
        return (
          <Loaded {...props} />
        )
      }

      return (
        OnLoading ? (<OnLoading />) : (
          <h1>
...Loading
          </h1>
        )
      )
    }
  }
)
