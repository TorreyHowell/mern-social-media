import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import postService from './postService'

const initialState = {
  posts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const getPosts = createAsyncThunk(
  'posts/getAll',
  async (_, thunkAPI) => {
    try {
      return postService.getPosts()
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

export const getUserPosts = createAsyncThunk(
  'posts/get',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return postService.getUserPosts(token)
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

export const createPost = createAsyncThunk(
  'posts/create',
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await postService.createPost(formData, token)
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

        state.posts = action.payload
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.isLoading = false
        state.message = action.payload
      })
      .addCase(createPost.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createPost.fulfilled, (state) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.message = action.payload
      })
      .addCase(getUserPosts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUserPosts.fulfilled, (state, action) => {
        state.isLoading = false
        state.posts = action.payload
      })
      .addCase(getUserPosts.rejected, (state, action) => {
        state.isLoading = false
        state.message = action.payload
      })
  },
})

export const { reset } = postSlice.actions
export default postSlice.reducer
