import axios from 'axios'

const API = '/api/posts/'

const getPosts = async () => {
  const response = await axios.get(API)

  return response.data
}

const postService = {
  getPosts,
}

export default postService
