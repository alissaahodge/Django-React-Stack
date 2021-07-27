import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {Link as RouterLink, useLocation, useNavigate} from 'react-router-dom';
import decode from 'jwt-decode';
import {AppBar, Box, Button, Hidden, Toolbar} from '@material-ui/core';
import Logo from './Logo';
import {LOGOUT} from "../constants/actionTypes";

const MainNavbar = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] =  useState(JSON.parse(localStorage.getItem('profile')));
  useEffect(() => {
    const token = user?.token;
    //JWT
    setUser(JSON.parse(localStorage.getItem('profile')));
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }
  }, [location]);

  const logout = () => {
    dispatch({type: LOGOUT});
    navigate('/home', {replace: true});
    setUser(null);
  };
  return (<AppBar
    elevation={0}
    {...props}
  >
    <Toolbar sx={{height: 64}}>
      <RouterLink to="/">
        <Logo/>
      </RouterLink>
      <Box sx={{flexGrow: 1}}/>
      {
        !user && <Hidden lgDown>
          <RouterLink to="login">
            <Button
              color="secondary"
              fullWidth
              size="medium"
              variant="contained"
            >
              Login
            </Button></RouterLink>
        </Hidden>
      }&nbsp;&nbsp;
      {
        !user && <Hidden lgDown>
          <RouterLink to="register">
            <Button
              color="secondary"
              fullWidth
              size="medium"
              variant="contained"
            >
              Sign Up
            </Button></RouterLink>
        </Hidden>}&nbsp;&nbsp;
      {
        user && <Hidden lgDown>
          <RouterLink to="register">
            <Button
              color="secondary"
              fullWidth
              size="medium"
              variant="contained"
              onClick={logout}
            >
              Log Out
            </Button></RouterLink>
        </Hidden>}
    </Toolbar>
  </AppBar>);
};

export default MainNavbar;
