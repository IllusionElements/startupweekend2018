/* eslint-disable */

import React from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import { AI } from '/imports/api'

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  margin: {
    margin: theme.spacing.unit
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3
  },
  textField: {
    flexBasis: 200
  }
});


const Form = ({ name, state, handleChange, classes }) => (
  <FormControl fullWidth className={classes.margin}>
    <InputLabel htmlFor={name}>{name}</InputLabel>
    <Input id={name} value={state[name]} onChange={handleChange(`${name}`)} />
  </FormControl>
);

class InputAdornments extends React.Component {
  state = {
    name: "abc",
    age: "42",
    career: "Engineer",
    school: "University of Country",
    major: "BSc",
    workExperience: "....",
    projectDescription: "",
    render: {
      next: false,
      last: false,
    },
    clientName: null,
  };

  optionz = ["Age", "School", "WorkExperience"];
  handleChange = prop => event => {
    if (prop === "WorkExperience") {
      this.setState({ workExperience: event.target.value });
    } else {
      this.setState({ [prop.toLowerCase()]: event.target.value });
    }
  };

  onClick = () => {
    Meteor.call('post query', this.state)
    setTimeout(()=>Meteor.call('getQuery', { name: 'user' }, (err, res) => {
      if(res) {
        this.setState({ clientName: res.name })
      }
    }), 1000)
  };


  render() {
    const { classes } = this.props;
    if(this.state.render.next) {
      return  (
        <Skills name={this.state.clientName} /> )
    }

    if(this.state.render.last) {
      return (
        <Analysis name={this.state.clientName} />
      )
    }
    return (
      <div className={classes.root}>
      <Grid container item lg={12}>
        <Typography variant="display3" gutterBottom>CareerMe</Typography>
      </Grid>
      <br />
      <Grid container item xs={12}>
        <TextField
          select
          label="Choose your Profession"
          className={classNames(classes.margin, classes.textField)}
          value={this.state.career}
          onChange={this.handleChange("career")}
        >
          {this.props.careers.map(option => (
            <MenuItem key={option._id._str} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
        <FormControl fullWidth className={classes.margin}>
          <InputLabel htmlFor="adornment-amount">Name</InputLabel>
          <Input
            id="adornment-amount"
            value={this.state.name}
            onChange={this.handleChange("name")}
          />
        </FormControl>

        {this.optionz.map(option => (
          <Form
           key={option}
            name={option === 'WorkExperience' ? 'Work Experience': option}
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
            onChange={this.handleChange("projectDescription")}
            rows={6}
          >
            {this.state.projectDescription}
          </TextField>
        </Grid>
      </div>
    );
  }
}

const Style = withStyles(styles)(InputAdornments);

export default (props) => (
  <Style careers={props.career} />
);
