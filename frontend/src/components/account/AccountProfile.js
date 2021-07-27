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
import React, {useState} from "react";
import FileBase from "react-file-base64";
import {updateAccount} from "../../store/actions/auth";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";


const AccountProfile = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  const handleSubmit = () => {
    dispatch(updateAccount(user._id, {
      ...user
    }));
    navigate('/app/account', {replace: true});
    window.location.reload();

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
            src={user.result.profilePhoto}
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
            {user.result.firstName}  &nbsp;{user.result.lastName}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body1"
          >
            {user.result.email}
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
                  onDone={({base64}) => {user.result.profilePhoto = base64; handleSubmit()}}/>
      </CardActions>
    </Card>
  )
};

export default AccountProfile;
