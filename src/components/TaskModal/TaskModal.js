import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Modal,
  FormControl,
  Input,
  InputLabel,
  Button,
  LinearProgress,
  Checkbox,
  Typography,
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
    editingTask: PropTypes.object,
  };

  constructor(props) {
    super(props);

    const { editingTask } = props;

    this.state = {
      form: {
        title: editingTask ? editingTask.name : '',
        done: editingTask ? editingTask.done : false,
      },

      isEditing: !!editingTask,
    };
  }

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

  onStatusChange = args => {
    const { name, checked } = args.target;
    const { form } = this.state;

    this.setState({
      form: {
        ...form,

        [name]: checked,
      },
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const { onSubmit, editingTask } = this.props;
    const { form } = this.state;

    editingTask
      ? onSubmit({ id: editingTask._id, title: form.title, done: form.done })
      : onSubmit({ title: form.title, done: form.done });
  };

  render() {
    const { classes, isOpen, onClose, isTaskInProcess } = this.props;
    const { form, isEditing } = this.state;

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
              <InputLabel htmlFor="title">Title</InputLabel>
              <Input
                name="title"
                id="title"
                onChange={this.onChange}
                value={form.title}
                autoComplete="off"
                autoFocus
              />
            </FormControl>
            <FormControl margin="normal" fullWidth disabled={isTaskInProcess}>
              <Typography
                className={classes.doneTitle}
                component="h1"
                variant="h5"
              >
                Done
              </Typography>
              <Checkbox
                name="done"
                id="done"
                color="default"
                onChange={this.onStatusChange}
                checked={form.done}
                autoFocus
              />
            </FormControl>
            {isEditing ? (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isTaskInProcess}
                className={classes.submit}
              >
                Update
              </Button>
            ) : (
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
            )}
          </form>
        </div>
      </Modal>
    );
  }
}

export default withStyles(styles)(TaskModal);
