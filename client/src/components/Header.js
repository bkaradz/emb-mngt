import React from 'react'
import { AccountCircle, Mail as MailIcon, MenuOpen as MenuOpenIcon, Notifications as NotificationsIcon, Menu as MenuIcon } from '@material-ui/icons'
import { IconButton, Menu, MenuItem, Badge } from '@material-ui/core'

const Header = ({ handleClick, bigNav }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClicked = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div className='head'>
      <div className='left-head'>
        <button className='nav-toggle' onClick={(e) => handleClick(e)}>
          {bigNav ? <MenuIcon /> : <MenuOpenIcon />}
        </button>
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
            <AccountCircle />
          </IconButton>
          <Menu id='simple-menu' anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  )
}

export default Header
