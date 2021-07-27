import axios from 'axios';
import {BACKEND_API} from '../../environment/environment';

const API = axios.create({baseUrl: BACKEND_API});

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const commentPost = (value,id) => API.post(`/posts/${id}/commentPost`, {value});

export const fetchComments = (id) => API.get(`/posts/${id}/comments`);
export const createComment = (newComment) => API.post('/posts/comment', newComment);
export const deleteComment = (id) => API.delete(`/posts/comments/${id}`);

export const signIn = (formData) => API.post('/users/signin', formData);
export const signUp = (formData) => API.post('/users/signup', formData);
export const updateAccount = (id, updatedAccount) => API.patch(`/users/${id}`, updatedAccount);
export const updateAccountPassword = (id, updatedAccount) => API.patch(`/users/password/${id}`, updatedAccount);
