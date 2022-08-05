import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { TextField, Box, Typography, Button, Grid } from '@mui/material'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { register } from '../features/auth/authSlice'
import { Link } from 'react-router-dom'

function Register() {
  const { user, isSuccess } = useSelector((state) => state.auth)

  const [value, setValue] = useState(null)
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
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

    const userData = {
      ...formData,
      dob: value,
    }
    dispatch(register(userData))
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
            Register
          </Typography>
          <Box>
            <TextField
              type={'text'}
              id="userName"
              name="userName"
              label="User Name"
              variant="outlined"
              onChange={onChange}
              value={formData.userName}
              fullWidth
              autoComplete="no"
            />
          </Box>

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
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                views={['year', 'month', 'day']}
                label="Date of birth"
                id="dob"
                name="dob"
                inputFormat="MM/dd/yyyy"
                value={value}
                onChange={setValue}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
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
          <Box>
            <TextField
              id="passwordConfirmation"
              name="passwordConfirmation"
              label="Confirm Password"
              type={'password'}
              variant="outlined"
              onChange={onChange}
              value={formData.passwordConfirmation}
              fullWidth
            />
          </Box>
          <Grid width={300} container justifyContent={'center'} mt={1}>
            <Button type="submit" variant="contained" fullWidth>
              Submit
            </Button>
          </Grid>
          <Typography mt={2} textAlign={'center'}>
            Already have an account? <Link to="/login">Login</Link>
          </Typography>
        </Box>
      </Box>
    </>
  )
}
export default Register
