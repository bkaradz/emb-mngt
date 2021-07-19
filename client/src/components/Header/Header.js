import React, { useEffect, useState } from 'react'
import { AccountCircle, Mail as MailIcon, MenuOpen as MenuOpenIcon, Notifications as NotificationsIcon, Menu as MenuIcon } from '@material-ui/icons'
import { IconButton, Menu, MenuItem, Badge, Typography } from '@material-ui/core'
import Login from '../Auth/Login'
import { useSelector, useDispatch } from 'react-redux'
import { loginFailed } from '../../store/features/auth/authSlice'
import { useLocation } from 'react-router-dom'
import { getCurrentUiState } from '../../store/features/ui/uiSlice'
// import { Redirect, useLocation } from 'react-router-dom'

const Header = ({ handleClick, bigNav }) => {
  const dispatch = useDispatch()
  let location = useLocation().pathname
  const [anchorEl, setAnchorEl] = useState(null)
  console.log(location)

  useEffect(() => {
    dispatch(getCurrentUiState(location))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  // console.log(useSelector((state) => state.ui.ui.uiStates[location]))

  // let title = useSelector((state) => state.ui.ui.currentUI.headerTitle)

  // let titleText = title.headerTitle

  // if (titleText) {
  //   titleText = 'Undefined'
  // }

  let name = ''
  // let _id = ''
  let showLogin = !useSelector((state) => state.auth.isLoggedIn)
  const user = useSelector((state) => state.auth.user)

  if (user) {
    name = user.name
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
      {/* {showLogin && <Redirect to='/login' />} */}
      <div className='left-head'>
        <button className='nav-toggle' onClick={(e) => handleClick(e)}>
          {bigNav ? <MenuIcon /> : <MenuOpenIcon />}
        </button>
        <Typography variant='h6' noWrap>
          {/* {title} */}
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
