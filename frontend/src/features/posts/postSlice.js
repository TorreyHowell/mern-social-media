import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import postService from './postService'

const initialState = {
  posts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const getPosts = createAsyncThunk('posts/getAll', async (thunkAPI) => {
  try {
    return postService.getPosts()
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const postSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.posts = []
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.posts = action.payload
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.isLoading = false
        state.message = action.payload
      })
  },
})

export const { reset } = postSlice.actions
export default postSlice.reducer
