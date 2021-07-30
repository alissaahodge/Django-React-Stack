import axios from 'axios';
import {BACKEND_API} from '../../environment/environment';

axios.defaults.baseURL = BACKEND_API;
const API = axios;
API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
});

export const fetchPosts = (page) => API.get(`/blog/posts/?page=${page}`);
export const fetchPost = (id) => API.get(`/blog/posts/${id}/`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/blog/search/searchQuery-${searchQuery.search || 'none'}&tags-${searchQuery.tags|| 'none'}`);
export const createPost = (newPost) => API.post('/blog/posts/', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/blog/posts/${id}/`, updatedPost);
export const deletePost = (id) => API.delete(`/blog/posts/${id}/`);

export const signIn = (formData) => API.post('/auth/oauth/token', formData);
export const signUp = (formData) => API.post('/register/', formData);
export const updateAccount = (id, updatedAccount) => API.patch(`/users/${id}/`, updatedAccount);
export const getAccountDetails = (id) => API.get(`/users/${id}/`);
export const updateAccountPassword = (id, updatedAccount) => API.put(`/change-password/`, updatedAccount);
