import axios from 'axios'

const SESSION_URL = '/api/sessions/'
const USERS_URL = '/api/users/'

const refreshUser = async () => {
  const response = await axios.get(SESSION_URL + 'refresh')

  return response.data
}

const login = async (userData) => {
  const response = await axios.post(SESSION_URL, userData)

  return response.data
}

const register = async (userData) => {
  const response = await axios.post(USERS_URL, userData)

  return response.data
}

const logout = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.delete(SESSION_URL, config)

  return response.data
}

const authService = {
  refreshUser,
  login,
  logout,
  register,
}

export default authService
