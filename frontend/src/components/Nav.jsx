import { useState, useEffect, useRef } from 'react'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import FavoriteIcon from '@mui/icons-material/Favorite'
import Paper from '@mui/material/Paper'
import { Link, useLocation } from 'react-router-dom'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import PersonIcon from '@mui/icons-material/Person'
import { Container } from '@mui/system'

function Nav() {
  const [value, setValue] = useState(5)
  const ref = useRef(null)
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/profile') {
      setValue(2)
    }
    if (location.pathname === '/') {
      setValue(1)
    }
    if (location.pathname === '/create') {
      setValue(0)
    }
  }, [location])
  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />

      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation showLabels value={value}>
          <BottomNavigationAction
            component={Link}
            to="/create"
            icon={<AddCircleOutlineIcon fontSize="large" />}
          />
          <BottomNavigationAction
            component={Link}
            to="/"
            icon={<FavoriteIcon fontSize="large" />}
          />
          <BottomNavigationAction
            component={Link}
            to="/profile"
            icon={<PersonIcon fontSize="large" />}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  )
}
export default Nav
