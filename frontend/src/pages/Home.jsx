import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPosts, reset } from '../features/posts/postSlice'
import Post from '../components/Post'
import { Box } from '@mui/material'

function Home() {
  const dispatch = useDispatch()

  const { posts } = useSelector((state) => state.posts)

  useEffect(() => {
    dispatch(getPosts())

    return () => {
      dispatch(reset())
    }
  }, [dispatch])
  return (
    <Box sx={{}}>
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </Box>
  )
}
export default Home
