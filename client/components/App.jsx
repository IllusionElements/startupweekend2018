// @flow
import React from 'react'
// import { withQuery } from 'meteor/cultofcoders:grapher-react'
import withCall from './CallProvider'
import Career from './form'

type CareerType = {
  name: string,
  keywords: string[]
}

type PropsType = {
  careers: CareerType
}

@withCall('getQuery', { name: 'career' })
class App extends React.Component<PropsType, {}> {
  static displayName = 'Career'

  render() {
    const { careers } : { careers: CareerType } = this.props
    return (
      <Career career={careers} />
    )
  }
}

export default App
