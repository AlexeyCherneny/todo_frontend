const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    padding: `${theme.spacing.unit}px 0`,
    backgroundColor: '#212121',
    color: 'white',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  titleMain: {
    fontSize: 27,
  },
});

export default styles;
