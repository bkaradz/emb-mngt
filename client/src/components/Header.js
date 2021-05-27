import user from '../img/zahra-amiri-1q6LXasG1hY-unsplash1.jpg'
import { FaBars, FaCogs, FaRegWindowClose } from 'react-icons/fa'

const Header = ({ handleClick, bigNav }) => {
  return (
    <div className='head'>
      <div className='left-head'>
        <button className='nav-toggle' onClick={(e) => handleClick(e)}>
          {bigNav ? <FaBars /> : <FaRegWindowClose />}
        </button>
      </div>
      <div className='right-head'>
        <div className='logged-in-user'>
          <img src={user} alt='' />
          <div>
            <p>John Doe</p>
            <p>Admin</p>
          </div>
        </div>
        <div className='icon'>
          <FaCogs />
        </div>
        <div className='icon'>
          <FaRegWindowClose />
        </div>
      </div>
    </div>
  )
}

export default Header
