import React from 'react';
import {
  Box,
  Button,
  Card,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';


const PostFormToolbar = (props) => {
  return (
    <Box {...props}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <Button
          color="primary"
          variant="contained"
          onClick={props.onSubmit}
        >
          Save Post
        </Button>

        <ConfirmDialog
          dialogText="Are You Sure You Want to Remove This?"
          okBtnText="Yes" cancelBtnTxt="No" openState={false}
          color="primary" size="small"
          removeFunction={props.onDelete}
          dialogBtnTxt={<><DeleteIcon fontSize="small"/>&nbsp;Remove</>}/>
      </Box>
      <Box sx={{mt: 3}}>
        <Card>
        </Card>
      </Box>
    </Box>
  )
};

export default PostFormToolbar;
