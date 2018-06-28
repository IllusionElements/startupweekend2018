// @flow
import React from 'react'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { inject } from '../../lib/react/decorators'

class LoginTabs extends React.Component {
  state = {
    value: 2,
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  @inject('state')
  render({ state }) {
    return (
      <Paper>
        <Tabs
          value={state.value}
          indicatorColor="primary"
          textColor="primary"
          onChange={this.handleChange}
        >
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>
      </Paper>
    )
  }
}

export default LoginTabs
