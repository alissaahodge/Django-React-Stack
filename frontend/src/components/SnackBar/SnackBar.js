import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
// import MuiAlert from '@material-ui/lab/Alert';
import Alert from '@material-ui/lab/Alert';

import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: '40px',
    },
  },
}));


const CustomizedSnackbars = ({severity, message, open_, variant, horizontal, vertical}) => {
  // severity could be error, warning, info, success
  const classes = useStyles();
  const [open, setOpen] = React.useState(open_);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{vertical: vertical, horizontal: horizontal}}>
        <Alert severity={severity} variant={variant}>{message}</Alert>
      </Snackbar>
    </div>
  );
};

export default CustomizedSnackbars;
