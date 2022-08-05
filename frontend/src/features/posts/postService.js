import axios from 'axios'

const API = '/api/posts/'

const getPosts = async () => {
  const response = await axios.get(API)

  return response.data
}

const getUserPosts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(`${API}self`, config)

  return response.data
}

const createPost = async (formData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  }

  const response = await axios.post(API, formData, config)

  return response.data
}

const postService = {
  getPosts,
  createPost,
  getUserPosts,
}

export default postService
