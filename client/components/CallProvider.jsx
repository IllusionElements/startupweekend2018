import React from 'react'
import { getDisplayName } from '/lib/react/decorators'

const promise = (...args) => new Promise((resolve, reject) => (
  Meteor.call(...args, (err, res) => {
    if (err) reject(err)
    resolve(res)
  })))

export default (param, ...args) => Component => (
  class extends React.Component {
    static displayName = `withMeteorCall(${getDisplayName(Component)})`

    state = {
      loaded: false,
      careers: null,
    }

    componentDidMount() {
      promise(param, ...args)
        .then((r) => {
          this.setState({ loaded: true, careers: r })
        })
    }

    render() {
      const { loaded, careers } = this.state

      if (!loaded) {
        return (
          <h1>
            ...Loading
          </h1>
        )
      }
      if (loaded && !careers) {
        return (
          <h1>
            ...oops error
          </h1>
        )
      }

      return (
        <Component careers={careers} {...this.props} />
      )
    }
  }
)
