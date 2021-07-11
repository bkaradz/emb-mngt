import React, { useState } from 'react'
import logo from '../../assets/logo.png'
import { NavLink } from 'react-router-dom'
import { links } from './nav-data'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const Nav = ({ bigNav }) => {
  const [activeUrl, setActiveUrl] = useState('')
  const [toggleMenu, setToggleMenu] = useState(false)

  return (
    <div className='navbar-menu'>
      <div className={bigNav ? `nav-brand_big` : `nav-brand_small`}>
        <img src={logo} alt='The Embroidery Shop' />
      </div>
      <div className={bigNav ? `nav-list_menu_big` : `nav-list_menu_small`}>
        <nav>
          <ul>
            {links.map((link) => {
              const { id, icon, url, text, children } = link
              const parentText = text
              if (children.length === 0) {
                return (
                  <li key={id}>
                    <NavLink exact to={url} onClick={() => setActiveUrl(parentText)}>
                      <span>{icon}</span>
                      <span className={bigNav ? `nav--text` : 'd-none'}>{text}</span>
                    </NavLink>
                  </li>
                )
              }
              return (
                <li key={id}>
                  <NavLink
                    exact
                    to={url}
                    onClick={() => {
                      setActiveUrl(parentText)
                      setToggleMenu(!toggleMenu)
                    }}
                    className='d-flex align-items-center'
                  >
                    <span>{icon}</span>
                    <span className={bigNav ? `nav--text` : 'd-none'}>{text}</span>
                    <span className={bigNav ? `ms-auto me-3` : `d-none`}>
                      {activeUrl === text && toggleMenu ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </span>
                  </NavLink>
                  <ul className={activeUrl === text && toggleMenu ? `child` : `child d-none`}>
                    {children.map((child) => {
                      const { id, url, icon, text } = child
                      return (
                        <li key={id}>
                          <NavLink exact to={url} onClick={() => setActiveUrl(parentText)}>
                            <span>{icon}</span>
                            <span className={bigNav ? `nav--text` : 'd-none'}>{text}</span>
                          </NavLink>
                        </li>
                      )
                    })}
                  </ul>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Nav
