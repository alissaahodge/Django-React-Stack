import React from 'react';
import {
  Box,
  Button,
  Card,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';
import {deletePost} from "../../store/actions/posts";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";


const PostFormToolbar = ({onSubmit, id, showRemove}) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onDelete = () => {
    dispatch(deletePost(id));
    navigate('/app/posts', {replace: true});

  };
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <Button
          color="primary"
          variant="contained"
          onClick={onSubmit}
        >
          Save Post
        </Button>

        {showRemove === true && <ConfirmDialog
          dialogText="Are You Sure You Want to Remove This?"
          okBtnText="Yes" cancelBtnTxt="No" openState={false}
          color="primary" size="small"
          removeFunction={onDelete}
          dialogBtnTxt={<><DeleteIcon fontSize="small"/>&nbsp;Remove</>}/>}
      </Box>
      <Box sx={{mt: 3}}>
        <Card>
        </Card>
      </Box>
    </Box>
  )
};

export default PostFormToolbar;
