// @flow
import React from 'react'
import Meteor from 'meteor/meteor'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
// import IconButton from '@material-ui/core/IconButton'
import {
  Input,
  InputLabel,
  FormControl,
  MenuItem,
  Typography,
  Grid,
  // InputAdornment,
  // FormHelperText,
  // Button,
} from '@material-ui/core'
// import { AI } from '/imports/api'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  },
  textField: {
    flexBasis: 200,
  },
})

type FormTypes = {
  name: string,
  state: any,
  handleChange(name: string): void,
  classes: any,
}

const Form = ({
  name,
  state,
  handleChange,
  classes,
}: FormTypes) => (
  <FormControl fullWidth className={classes.margin}>
    <InputLabel htmlFor={name}>
      {name}
    </InputLabel>
    <Input id={name} value={state[name]} onChange={handleChange(`${name}`)} />
  </FormControl>
)

type StateType = {
  name: string,
  age: string,
  career: string,
  school: string,
  major: string,
  projectDescription: string,
  clientName: ?string,
}
type PropsType = {
  classes: any,
  careers: {
    name: string,
    keywords: Array<{ _id: string, name: string }>
  }
}

interface iInputAdornments {
  optionz: string[],
  state: StateType,
  onClick(): void,
  handleChange(prop: string): (event: any) => void,
}
class InputAdornments extends React.Component<PropsType, StateType> implements iInputAdornments {
  optionz = ['Age', 'School', 'WorkExperience']

  state = {
    name: 'abc',
    age: '42',
    career: 'Engineer',
    school: 'University of Country',
    major: 'BSc',
    workExperience: '....',
    projectDescription: '',
    clientName: null,
  }

  onClick = () => {
    Meteor.call('post query', this.state)
    setTimeout(() => Meteor.call('getQuery', { name: 'user' }, (err, res) => {
      if (res) {
        this.setState({ clientName: res.name })
      }
    }), 1000)
  }

  handleChange = prop => (event) => {
    if (prop === 'WorkExperience') {
      this.setState({ workExperience: event.target.value })
    } else {
      this.setState({ [prop.toLowerCase()]: event.target.value })
    }
  }


  render() {
    const { classes, careers } = this.props
    const { career, projectDescription, name } = this.state
    return (
      <div className={classes.root}>
        <Grid container item lg={12}>
          <Typography variant="display3" gutterBottom>
            CareerMe
          </Typography>
        </Grid>
        <br />
        <Grid container item xs={12}>
          <TextField
            select
            label="Choose your Profession"
            className={classNames(classes.margin, classes.textField)}
            value={career}
            onChange={this.handleChange('career')}
          >
            {careers.map(option => (
              <MenuItem key={option._id._str} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
          <FormControl fullWidth className={classes.margin}>
            <InputLabel htmlFor="adornment-amount">
              Name
            </InputLabel>
            <Input
              id="adornment-amount"
              value={name}
              onChange={this.handleChange('name')}
            />
          </FormControl>

          {this.optionz.map(option => (
            <Form
              key={option}
              name={option === 'WorkExperience' ? 'Work Experience' : option}
              state={this.state}
              handleChange={this.handleChange}
              classes={classes}
            />
          ))}
        </Grid>
        <Grid item lg={12}>
          <TextField
            multiline
            fullWidth
            label="Give a description of one of your projects you have done in your field"
            className={classNames(classes.margin, classes.textField)}
            onChange={this.handleChange('projectDescription')}
            rows={6}
          >
            {projectDescription}
          </TextField>
        </Grid>
      </div>
    )
  }
}

const Style = withStyles(styles)(InputAdornments)

export default ({ career }: PropsType.career) => (
  <Style careers={career} />
)
