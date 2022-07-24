import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import { useDispatch } from 'react-redux'
import { refresh, reset } from './features/auth/authSlice'
import { useEffect } from 'react'
import { Grid } from '@mui/material'
import Nav from './components/Nav'
import NotFound from './pages/NotFound'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(refresh())

    return () => {
      reset()
    }
  }, [dispatch])
  return (
    <>
      <BrowserRouter>
        <Grid container justifyContent="center">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Grid>

        <Nav />
      </BrowserRouter>
    </>
  )
}

export default App
