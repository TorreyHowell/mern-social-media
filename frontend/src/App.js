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
import Header from './components/Header'
import { useSelector } from 'react-redux'
import Create from './pages/Create'
import Register from './pages/Register'

function App() {
  const dispatch = useDispatch()
  const { isRefreshing } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(refresh())

    return () => {
      reset()
    }
  }, [dispatch])

  if (isRefreshing) return <></>
  return (
    <>
      <BrowserRouter>
        <Header />

        <Grid container justifyContent="center">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create" element={<Create />} />

            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Grid>

        <Nav />
      </BrowserRouter>
    </>
  )
}

export default App
