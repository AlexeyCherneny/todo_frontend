const styles = theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
    width: 'auto',
    display: 'block',
    [theme.breakpoints.up(800 + theme.spacing.unit * 3 * 2)]: {
      width: 800,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  paper: {
    marginTop: theme.spacing.unit * 8,
    backgroundColor: '#EEEEEE',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
  },
  tasks: {
    width: '100%',
    fontSize: 27,
    height: '60vh',
    overflow: 'auto',
    marginTop: theme.spacing.unit * 3,
  },
  todosTitle: {
    marginTop: `${theme.spacing.unit * 2}px`,
    fontSize: 30,
  },
  task: {
    color: 'white',
    border: '1px solid #757575',
    backgroundColor: '#757575',
    borderRadius: 5,
    transition: '0.4s',
    margin: `${theme.spacing.unit}px 0`,
    paddingRight: `${theme.spacing.unit * 0.7}px`,
  },
  doneTask: {
    border: '1px solid #00E676',
    backgroundColor: '#00E676',
  },
  linearColorPrimary: {
    backgroundColor: '#b2dfdb',
  },
  linearBarColorPrimary: {
    backgroundColor: '#00695c',
  },
  tasksProgress: {
    backgroundColor: 'red',
  },
  taskTitle: {
    color: 'white',
    fontSize: 23,
  },
  taskIconButton: {
    padding: theme.spacing.unit * 0.8,
  },
  taskAction: {
    color: 'white',
  },
  addTaskBtn: {
    backgroundColor: '#212121',
    color: 'white',
    marginTop: `${theme.spacing.unit * 2}px`,
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px`,
    fontSize: 22,
    '&:hover': {
      backgroundColor: '#616161',
    },
  },
  fabProgress: {
    position: 'absolute',
    top: -2,
    left: -2,
    zIndex: 1,
  },
  taskIcon: {
    position: 'relative',
  },
});

export default styles;
