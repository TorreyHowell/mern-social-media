import axios from 'axios'

const SESSION_URL = '/api/sessions/'

const refreshUser = async () => {
  const response = await axios.get(SESSION_URL + 'refresh')

  return response.data
}

const login = async (userData) => {
  const response = await axios.post(SESSION_URL, userData)

  return response.data
}

const authService = {
  refreshUser,
  login,
}

export default authService
