import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@material-ui/core';
import React, {useEffect, useState} from "react";
import FileBase from "react-file-base64";
import {updateAccount} from "../../store/actions/auth";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";


const AccountProfile = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = () => {
    dispatch(updateAccount(props.user.id, {
      ...props.user
    }));
    navigate('/app/account', {replace: true});
  };
  return (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            src={props.user.profilePhoto}
            sx={{
              height: 100,
              width: 100
            }}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            {props.user.first_name}  &nbsp;{props.user.last_name}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body1"
          >
            {props.user.email}
          </Typography>
        </Box>
      </CardContent>
      <Divider/>
      <CardActions>
        {/*<Button*/}
        {/*  color="primary"*/}
        {/*  fullWidth*/}
        {/*  variant="text"*/}
        {/*>*/}
        {/*  Upload picture*/}
        {/*</Button>*/}

        <FileBase type="file" multiple={false}
                  onDone={({base64}) => {props.user.profilePhoto = base64; handleSubmit()}}/>
      </CardActions>
    </Card>
  )
};

export default AccountProfile;
