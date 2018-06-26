import React from 'react'
import { render as h } from 'react-dom'
import { withCall } from './CallProvider'
import { withQuery } from 'meteor/cultofcoders:grapher-react'
import Career from './form'


const getName = x => x.displayName || x.name || 'Component'
const wrapDisplayName = wrapper => (Component) => (
  class extends React.Component {
    static displayName = `${wrapper}(${getName(Component)})`
    render() {
      return (
        <Component {...this.props} />
      )
    }
  }
)


@withCall('getQuery', { name: 'career' })
class App extends React.Component {
  static displayName = 'Career'
  render() {
    return (
      <Career career={this.props.careers} />
    )
  }
}

const root = document.getElementById('root')

export default App