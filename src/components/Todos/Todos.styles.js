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
    border: '1px solid #29B6F6',
    backgroundColor: '#29B6F6',
    borderRadius: 5,
    margin: `${theme.spacing.unit}px 0`,
  },
  taskTitle: {
    color: 'white',
    fontSize: 23,
  },
  taskAction: {
    color: 'white',
  },
  addTaskBtn: {
    backgroundColor: '#0091ea',
    color: 'white',
    padding: `${theme.spacing.unit * 1.5}px ${theme.spacing.unit * 2.5}px`,
    fontSize: 25,
  },
  fabProgress: {
    position: 'absolute',
    top: 4,
    left: 4,
    zIndex: 1,
  },
  taskIcon: {
    position: 'relative',
  },
});

export default styles;
