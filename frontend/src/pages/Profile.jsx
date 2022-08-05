import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { reset as authReset } from '../features/auth/authSlice'
import Post from '../components/Post'
import { Box } from '@mui/material'
import { reset as postReset } from '../features/posts/postSlice'
import { getUserPosts, getPosts } from '../features/posts/postSlice'

function Profile() {
  const { user, isRefreshing } = useSelector((state) => state.auth)
  const { posts } = useSelector((state) => state.posts)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!user && !isRefreshing) {
      navigate('/login', { state: { from: '/profile' } })
    }

    dispatch(getUserPosts())

    return () => {
      dispatch(postReset())
      dispatch(authReset())
    }
  }, [navigate, user, dispatch, isRefreshing])
  return (
    <Box
      sx={{
        MaxWidth: 600,
      }}
    >
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </Box>
  )
}
export default Profile
