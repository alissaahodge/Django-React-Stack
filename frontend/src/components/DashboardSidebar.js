import React, {useEffect, useState} from 'react';
import {Link as RouterLink, useLocation, useNavigate} from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box, Button,
  Divider,
  Drawer,
  Hidden,
  List, Toolbar,
  Typography
} from '@material-ui/core';
import {
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  Book as BookIcon
} from 'react-feather';
import NavItem from './NavItem';
import {useDispatch} from "react-redux";
import decode from "jwt-decode";
import {LOGOUT} from "../constants/actionTypes";
import dummyFile from "../assets/images/avatars/dummy-avatar.jpg";


const items = [
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard'
  },
  {
    href: '/app/posts',
    icon: BookIcon,
    title: 'Manage Posts'
  },
  {
    href: '/app/products',
    icon: ShoppingBagIcon,
    title: 'Posts Listing'
  },
  {
    href: '/app/account',
    icon: UserIcon,
    title: 'Account'
  },
  {
    href: '/app/settings',
    icon: SettingsIcon,
    title: 'Settings'
  }
];

const DashboardSidebar = ({onMobileClose, openMobile}) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
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
  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 2
        }}
      >
        <Avatar
          component={RouterLink}
          src={user?.result?.profilePhoto || dummyFile}
          sx={{
            cursor: 'pointer',
            width: 64,
            height: 64
          }}
          to="/app/account"
        />
        <Typography
          color="textPrimary"
          variant="h5"
        >
          {user?.result.firstName}&nbsp;{user?.result?.lastName}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {user?.result?.email}
        </Typography>
        <br/>
        {
          user && <Hidden lgDown>
              <Button
                color="primary"
                fullWidth
                size="small"
                variant="contained"
                onClick={logout}
              >
                Log Out
              </Button>
          </Hidden>}
      </Box>
      <Divider/>
      <Box sx={{p: 2}}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box sx={{flexGrow: 1}}/>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => {
  },
  openMobile: false
};

export default DashboardSidebar;
