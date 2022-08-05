import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createPost, reset } from '../features/posts/postSlice'
import { Typography, Box, TextField, Button, Input } from '@mui/material'
import { useNavigate } from 'react-router-dom'

function Create() {
  const [body, setBody] = useState()
  const [file, setFile] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { isSuccess } = useSelector((state) => state.posts)
  const { user, isRefreshing } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!user && !isRefreshing) {
      navigate('/login', { state: { from: '/create' } })
    }

    if (file) {
      setImageUrl(URL.createObjectURL(file))
    }

    if (isSuccess) {
      navigate('/profile')
    }

    return () => {
      dispatch(reset())
    }
  }, [file, isSuccess, navigate, dispatch, user, isRefreshing])

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData()

    formData.append('image', file)
    formData.append('body', body)

    dispatch(createPost(formData))
  }

  return (
    <Box>
      <Typography
        align="center"
        sx={{
          mt: '20px',
        }}
        variant="h3"
      >
        Create Post
      </Typography>

      <Box
        sx={{
          mt: '20px',
        }}
        component={'form'}
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          minRows={4}
          id="body"
          name="body"
          label="Message"
          value={body}
          onChange={(e) => {
            setBody(e.target.value)
          }}
          sx={{
            width: '100%',
            mt: '5px',
          }}
          multiline
        />
        <Box>
          <Input
            type="file"
            name="file"
            onChange={(e) => {
              setFile(e.target.files[0])
            }}
          >
            upload
          </Input>
          {imageUrl && file && (
            <Box
              mt={2}
              sx={{
                display: 'flex',
              }}
            >
              <img
                style={{
                  width: '100%',
                  height: '194px',
                }}
                src={imageUrl}
                alt={file.name}
              />
            </Box>
          )}
        </Box>

        <Button
          type="submit"
          sx={{
            mt: '10px',
          }}
          variant="contained"
        >
          Post
        </Button>
      </Box>
    </Box>
  )
}
export default Create
