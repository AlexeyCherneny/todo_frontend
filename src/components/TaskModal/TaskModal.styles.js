const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    backgroundColor: '#212121',
    color: 'white',
    fontSize: 18,
    '&:hover': {
      backgroundColor: '#616161',
    },
  },
  doneTitle: {
    margin: 'auto',
    fontSize: 16,
  },
});

export default styles;
