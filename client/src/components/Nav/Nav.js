import React from 'react'
import logo from '../../img/logo.png'
import { NavLink } from 'react-router-dom'
import { links } from './nav-data'
// import { FaMap, } from "react-icons/fa";

const Nav = ({ bigNav }) => {
  // const hide = true
  return (
    <div className='navbar-menu'>
      <div className={bigNav ? `nav-brand_big` : `nav-brand_small`}>
        {/* style={{ height: '20px' }}  */}
        <img src={logo} alt='The Embroidery Shop' />
      </div>
      <div className={bigNav ? `nav-list_menu_big` : `nav-list_menu_small`}>
        <nav>
          <ul>
            {links.map((link) => {
              const { id, icon, url, text, children } = link
              if (children.length === 0) {
                return (
                  <li key={id}>
                    <NavLink exact to={url}>
                      <span>{icon}</span>
                      <span className={bigNav ? `nav--text` : 'nav--text_none'}>{text}</span>
                    </NavLink>
                  </li>
                )
              }
              return (
                <li key={id}>
                  {/* {hide || text} */}
                  <NavLink exact to={url}>
                    <span>{icon}</span>
                    <span className={bigNav ? `nav--text` : 'nav--text_none'}>{text}</span>
                  </NavLink>
                  <ul className='child'>
                    {children.map((child) => {
                      const { id, url, text } = child
                      return (
                        <li key={id}>
                          <NavLink exact to={url}>
                            <span>{icon}</span>
                            <span className={bigNav ? `nav--text` : 'nav--text_none'}>{text}</span>
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
