import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { TextField, Box, Typography, Button, Grid } from '@mui/material'
import { login } from '../features/auth/authSlice'

function Login() {
  const { user, isSuccess } = useSelector((state) => state.auth)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (isSuccess || user) {
      navigate('/')
    }
  }, [navigate, user, isSuccess])

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(login(formData))
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  return (
    <>
      <Box
        component={'form'}
        onSubmit={onSubmit}
        minHeight="80vh"
        alignItems={'center'}
        justifyContent="center"
        display={'flex'}
        sx={{
          '& .MuiTextField-root': { mt: 1 },
        }}
      >
        <Box>
          <Typography variant="h3" align="center">
            Login
          </Typography>

          <Box>
            <TextField
              type={'email'}
              id="email"
              name="email"
              label="Email"
              variant="outlined"
              onChange={onChange}
              value={formData.email}
              fullWidth
            />
          </Box>
          <Box>
            <TextField
              id="password"
              name="password"
              label="Password"
              type={'password'}
              variant="outlined"
              onChange={onChange}
              value={formData.password}
              fullWidth
            />
          </Box>
          <Grid width={300} container justifyContent={'center'} mt={1}>
            <Button type="submit" variant="contained" fullWidth>
              Login
            </Button>
          </Grid>
        </Box>
      </Box>
    </>
  )
}
export default Login
