import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Header() {
  const [anchorElUser, setAnchorElUser] = useState(null)
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const logout = () => {
    handleCloseUserMenu()
    navigate('login')
  }
  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: '#000000',
      }}
    >
      <Container maxWidth="sm">
        <Toolbar>
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'flex' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Not Twitter
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            {user ? (
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar>{user?.userName.charAt(0).toUpperCase()}</Avatar>
                </IconButton>
              </Tooltip>
            ) : (
              <IconButton component={Link} to="/login" sx={{ p: 0 }}>
                <Avatar></Avatar>
              </IconButton>
            )}

            {user && (
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem key="dashboard" onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Dashboard</Typography>
                </MenuItem>
                <MenuItem key="logout" onClick={logout}>
                  <Typography textAlign="center">logout</Typography>
                </MenuItem>
              </Menu>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Header
