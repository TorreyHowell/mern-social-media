import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { TextField, Box, Typography, Button, Grid } from '@mui/material'
import { login } from '../features/auth/authSlice'
import { Link } from 'react-router-dom'

function Login() {
  const { user, isSuccess } = useSelector((state) => state.auth)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  useEffect(() => {
    if (isSuccess || user) {
      navigate(`${location?.state?.from ? location.state.from : '/'}`)
    }
  }, [navigate, user, isSuccess, location])

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
          <Typography mt={2} textAlign={'center'}>
            Don't have an account? <Link to={'/register'}>Sign up</Link>
          </Typography>
        </Box>
      </Box>
    </>
  )
}
export default Login
