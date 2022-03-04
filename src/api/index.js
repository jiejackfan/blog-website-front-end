import axios from 'axios';

const API = axios.create({baseURL:'http://localhost:5000/'});
//const API = axios.create({baseURL:'https://blog-project-backend12.herokuapp.com/'});
//const url = 'http://localhost:5000/posts';
//const url = 'https://blog-project-backend12.herokuapp.com/posts';

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });
  

export const fetchPosts= () => API.get('/posts');
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const signIn = (formData) => API.post('/users/signin', formData);
export const signUp = (formData) => API.post('/users/signup', formData);
export const commentPost = (comment, id) => API.post(`/posts/${id}/commentPost`, {comment});