import React from 'react';
import {AUTH, UPDATE, LOGOUT} from "../../constants/actionTypes";
import * as api from '../api';
import CustomizedSnackbars from "../../components/SnackBar/SnackBar";
import {Paper} from '@material-ui/core/';
import ReactDOM from "react-dom";

export const signin = (formData) => async (dispatch) => {
  try {
    const {data} = await api.signIn(formData);
    dispatch({type: AUTH, data});
  } catch (e) {
    console.log(e)
    console.log(e.response.data.message);
    return (
      ReactDOM.render((
        <Paper elevation={6}>
          <CustomizedSnackbars variant="filled" horizontal="right" vertical="top" severity="error" message={e.response.data.message} open_={true}/>
        </Paper>
      ), document.getElementById('alert'))
    );
  }
};


export const signup = (formData) => async (dispatch) => {
  try {
    const {data} = await api.signUp(formData);
    dispatch({type: AUTH, data});
    return (
      ReactDOM.render((
        <Paper elevation={6}>
          <CustomizedSnackbars variant="filled" horizontal="right" vertical="top" severity="success" message={'Registration was successful!'} open_={true}/>
        </Paper>
      ), document.getElementById('alert'))
    );
  } catch (e) {
    console.log(e);
    return (
      ReactDOM.render((
        <Paper elevation={6}>
          <CustomizedSnackbars variant="filled" horizontal="right" vertical="top" severity="error" message={e.response.data.message} open_={true}/>
        </Paper>
      ), document.getElementById('alert'))
    );

  }
};

export const updateAccount = (id, acc) => async (dispatch) => {
  try {
    const {data} = await api.updateAccount(id, acc);
    console.log(data);
    return dispatch({type: UPDATE, data});

  } catch (error) {
    console.log(error.message);
    return (
      ReactDOM.render((
        <Paper elevation={6}>
          <CustomizedSnackbars variant="filled" horizontal="right" vertical="top" severity="error" message={error.response.data.message} open_={true}/>
        </Paper>
      ), document.getElementById('alert'))
    );
  }
};


export const updateAccountPassword = (id, acc) => async (dispatch) => {
  try {
    const {data} = await api.updateAccountPassword(id, acc);
    return dispatch({type: LOGOUT});

  } catch (error) {
    console.log(error.message);
    return (
      ReactDOM.render((
        <Paper elevation={6}>
          <CustomizedSnackbars variant="filled" horizontal="right" vertical="top" severity="error" message={error.response.data.message} open_={true}/>
        </Paper>
      ), document.getElementById('alert'))
    );
  }
};
