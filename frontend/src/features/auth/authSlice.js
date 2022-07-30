import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isRefreshing: true,
  message: '',
}

export const refresh = createAsyncThunk('auth/refresh', async (thunkAPI) => {
  try {
    return authService.refreshUser()
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const login = createAsyncThunk(
  'auth/login',
  async (userData, thunkAPI) => {
    try {
      return authService.login(userData)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(refresh.pending, (state) => {
        state.isRefreshing = true
      })
      .addCase(refresh.fulfilled, (state, action) => {
        state.user = action.payload
        state.isRefreshing = false
      })
      .addCase(refresh.rejected, (state, action) => {
        state.message = action.payload
        state.isRefreshing = false
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload
      })
  },
})

export const { reset } = authSlice.actions
export default authSlice.reducer
