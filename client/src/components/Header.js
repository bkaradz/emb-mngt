import React, { useState, useEffect } from 'react'

import user from '../img/zahra-amiri-1q6LXasG1hY-unsplash1.jpg'
import { FaBars, FaCogs, FaRegWindowClose } from 'react-icons/fa'

const Header = () => {
  const [width, setWidth] = useState('220px 1fr')

  const handleClick = (e) => {
    if (width === '220px 1fr') {
      setWidth('70px 1fr')
    } else {
      setWidth('220px 1fr')
    }
  }

  useEffect(() => {
    let el = document.querySelector('.App')
    el.attributeStyleMap.set('grid-template-columns', width)
  }, [width])

  return (
    <div className='head'>
      <div className='left-head'>
        <button className='nav-toggle' onClick={(e) => handleClick(e)}>
          <FaBars />
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
