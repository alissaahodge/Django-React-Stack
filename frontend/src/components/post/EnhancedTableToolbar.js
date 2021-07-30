import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {lighten, makeStyles} from '@material-ui/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import {useDispatch} from "react-redux";
import {deletePost} from "../../store/actions/posts";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";


const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: '20px',
    paddingRight: '10px',
  },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = ({numSelected, label, selectedPosts}) => {
  const classes = useToolbarStyles();
  const dispatch = useDispatch();

  const handleRemove = () => {
    selectedPosts.forEach((post) => {
      dispatch(deletePost(post));
    });
  };
  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          {label}
        </Typography>
      )}

      {numSelected > 0 ? (
        <ConfirmDialog
          dialogText="Are You Sure You Want to Remove These Posts?"
          okBtnText="Yes" cancelBtnTxt="No" openState={false}
          color="primary" size="small"
          removeFunction={handleRemove}
          tooltip='Delete'
          dialogBtnTxt={<>
              <DeleteIcon/></>}/>


      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon/>
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default EnhancedTableToolbar;
