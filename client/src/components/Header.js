import { AccountCircle, Mail as MailIcon, MenuOpen as MenuOpenIcon, Notifications as NotificationsIcon, Menu as MenuIcon } from '@material-ui/icons'

const Header = ({ handleClick, bigNav }) => {
  return (
    <div className='head'>
      <div className='left-head'>
        <button className='nav-toggle' onClick={(e) => handleClick(e)}>
          {bigNav ? <MenuIcon /> : <MenuOpenIcon />}
        </button>
      </div>
      <div className='right-head'>
        <div className='icon'>
          <MailIcon />
        </div>
        <div className='icon'>
          <NotificationsIcon />
        </div>
        <div className='icon'>
          <AccountCircle />
        </div>
      </div>
    </div>
  )
}

export default Header
