import React, { useState } from 'react'
import { AccountCircle, Mail as MailIcon, MenuOpen as MenuOpenIcon, Notifications as NotificationsIcon, Menu as MenuIcon } from '@material-ui/icons'
import { IconButton, Menu, MenuItem, Badge, Typography } from '@material-ui/core'
import Login from '../Auth/Login'
import { useSelector, useDispatch } from 'react-redux'
import { loginFailed } from '../../store/features/auth/authSlice'

const Header = ({ handleClick, bigNav }) => {
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = useState(null)
  let name = ''
  // let _id = ''
  let showLogin = !useSelector((state) => state.auth.isLoggedIn)
  const user = useSelector((state) => state.auth.user)
  if (user) {
    name = user.name
    // _id = user._id
    // console.log(_id)
  }

  const handleClicked = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleLogout = () => {
    setAnchorEl(null)
    dispatch(loginFailed())
  }

  return (
    <div className='head'>
      {showLogin && <Login />}
      <div className='left-head'>
        <button className='nav-toggle' onClick={(e) => handleClick(e)}>
          {bigNav ? <MenuIcon /> : <MenuOpenIcon />}
        </button>
        <Typography variant='h6' noWrap>
          Material-UI
        </Typography>
      </div>
      <div className='right-head'>
        <div>
          <IconButton>
            <Badge badgeContent={2} color='secondary'>
              <MailIcon />
            </Badge>
          </IconButton>
        </div>

        <div>
          <IconButton>
            <Badge badgeContent={4} color='secondary'>
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </div>
        <div>
          <IconButton aria-controls='simple-menu' aria-haspopup='true' onClick={handleClicked}>
            {/* Todo Added avatar */}
            <AccountCircle />
          </IconButton>
          <Menu id='simple-menu' anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem>{name}</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  )
}

export default Header
