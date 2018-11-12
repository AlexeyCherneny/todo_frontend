import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Modal,
  FormControl,
  Input,
  InputLabel,
  Button,
  LinearProgress,
} from '@material-ui/core';
import PropTypes from 'prop-types';

import styles from './TaskModal.styles';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const modalStyle = getModalStyle();

class TaskModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    onSubmit: PropTypes.func,
    isTaskInProcess: PropTypes.bool,
    onClose: PropTypes.func,
  };

  state = {
    form: {
      title: '',
    },
  };

  onChange = args => {
    const { name, value } = args.target;
    const { form } = this.state;

    this.setState({
      form: {
        ...form,

        [name]: value,
      },
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const { onSubmit } = this.props;
    const { form } = this.state;

    onSubmit({ title: form.title, done: false });
  };

  render() {
    const { classes, isOpen, onClose, isTaskInProcess } = this.props;
    const { form } = this.state;

    return (
      <Modal open={isOpen} onClose={onClose}>
        <div style={modalStyle} className={classes.paper}>
          {isTaskInProcess ? <LinearProgress /> : null}
          <form className={classes.form} onSubmit={this.onSubmit}>
            <FormControl
              margin="normal"
              required
              fullWidth
              disabled={isTaskInProcess}
            >
              <InputLabel htmlFor="email">Title</InputLabel>
              <Input
                name="title"
                id="title"
                onChange={this.onChange}
                value={form.title}
                autoFocus
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isTaskInProcess}
              className={classes.submit}
            >
              Add
            </Button>
          </form>
        </div>
      </Modal>
    );
  }
}

export default withStyles(styles)(TaskModal);
