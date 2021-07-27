import {
  FETCH_ALL,
  FETCH_POST,
  CREATE,
  UPDATE,
  DELETE,
  FETCH_BY_SEARCH,
  START_LOADING,
  END_LOADING
} from "../../constants/actionTypes";
import * as api from '../api';
import ReactDOM from "react-dom";
import {Paper} from '@material-ui/core/';
import CustomizedSnackbars from "../../components/SnackBar/SnackBar";
import React from "react";

// Action Creators

export const getPosts = (page) => async (dispatch) => {
  try {
    console.log(page)
    dispatch({type: START_LOADING});
    const {data} = await api.fetchPosts(page);
    dispatch({type: FETCH_ALL, payload: data});
    dispatch({type: END_LOADING});

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


export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({type: START_LOADING});
    const {data} = await api.fetchPost(id);
    console.log(data)
    dispatch({type: FETCH_POST, payload: data});
    dispatch({type: END_LOADING});

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

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({type: START_LOADING});
    const {data: {data}} = await api.fetchPostsBySearch(searchQuery);
    dispatch({type: FETCH_BY_SEARCH, payload: {...data}});
    dispatch({type: END_LOADING});

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

export const createPosts = (post) => async (dispatch) => {
  try {
    dispatch({type: START_LOADING});
    const {data} = await api.createPost(post);

    dispatch({type: CREATE, payload: data});
    dispatch({type: END_LOADING});
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
export const updatePost = (id, post) => async (dispatch) => {
  try {
    const {data} = await api.updatePost(id, post);
    return dispatch({type: UPDATE, payload: data});

  } catch (error) {
    console.log(error.message)
    return (
      ReactDOM.render((
        <Paper elevation={6}>
          <CustomizedSnackbars variant="filled" horizontal="right" vertical="top" severity="error" message={error.response.data.message} open_={true}/>
        </Paper>
      ), document.getElementById('alert'))
    );
  }
};


export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({type: DELETE, payload: id})

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
