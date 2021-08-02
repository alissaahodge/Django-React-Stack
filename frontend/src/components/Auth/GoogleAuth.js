import React from 'react';
import {useDispatch} from "react-redux";
import {Button, Box} from '@material-ui/core';
import {GoogleLogin} from "react-google-login";
import {GOOGLE_CLIENT_ID} from '../../environment/environment';
import GoogleIcon from "../../icons/Google";
import {useNavigate} from "react-router-dom";
import {googleAuth} from "../../store/actions/auth";

const GoogleAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const googleSuccess = async (res) => {
    try {
      dispatch(googleAuth(res.accessToken));

      navigate('/app/dashboard', {replace: true});
    } catch (error) {
      console.log(error)
    }

  };

  const googleFailure = (error) => {
    console.log(error);
    console.log('Google Sign in Was Unsuccessful. Try again Later.')

  };
  return (<Box sx={{mb: 3}}>

      <GoogleLogin clientId={GOOGLE_CLIENT_ID} render={(renderProps) => (<Button
        fullWidth
        startIcon={<GoogleIcon/>}
        onClick={renderProps.onClick}
        disabled={renderProps.disabled}
        size="large"
        variant="contained"
      >
        Login with Google
      </Button>)}
                   onSuccess={googleSuccess} onFailure={googleFailure} cookiePolicy="single_host_origin"/></Box>
  );
};
export default GoogleAuth;
