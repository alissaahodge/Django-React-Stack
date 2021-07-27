import React, {useEffect, useState} from 'react';
import {Link as RouterLink, useLocation, useNavigate} from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box, Button,
  Hidden,
  IconButton,
  Toolbar
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import Logo from './Logo';
import {useDispatch} from "react-redux";
import decode from "jwt-decode";
import {LOGOUT} from "../constants/actionTypes";

const DashboardNavbar = ({onMobileNavOpen, ...rest}) => {
  const [notifications] = useState([]);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    useEffect(() => {
    if (!user) {
      navigate('/login', {replace: true});
    }
  }, [user]);

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
    navigate('/', {replace: true});
    setUser(null);
  };
  return (
    <AppBar
      elevation={0}
      {...rest}
    >
      <Toolbar>
        <RouterLink to="/">
          <Logo/>
        </RouterLink>
        <Box sx={{flexGrow: 1}}/>
        <Hidden lgDown>
          <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon/>
            </Badge>
          </IconButton>

        {
          user && <Hidden lgDown>
              <Button
                color="secondary"
                size="small"
                variant="contained"
                onClick={logout}
              >
                Log Out
              </Button>
          </Hidden>}
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onMobileNavOpen}
          >
            <MenuIcon/>
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func
};

export default DashboardNavbar;
