import React from 'react';
import logo from '../../img/logo.png';
import { NavLink } from 'react-router-dom';
import { links } from './nav-data'
// import { FaMap, } from "react-icons/fa";

const Nav = () => {
  // const hide = true
  return (
    <div className="navbar-menu">
      <div className="nav-brand" >
        {/* style={{ height: '20px' }}  */}
        <img src={logo} alt="The Embroidery Shop" />
      </div>
      <div className="nav-menu">
        <nav>
          <ul>
            {links.map((link) => {
              const { id, icon, url, text, children } = link
              if (children.length === 0) {
                return <li key={id}>
                  <NavLink exact to={url}><span>{icon}</span><span>{text}</span></NavLink>
                </li>
              }
              return <li key={id}>
                {/* {hide || text} */}
                <NavLink exact to={url}><span>{icon}</span><span>{text}</span></NavLink>
                <ul className="child">
                  {
                    children.map((child) => {
                      const { id, url, text } = child
                      return <li key={id}>
                        <NavLink exact to={url}><span>{text}</span></NavLink>
                      </li>
                    })
                  }
                </ul>
              </li>

            })
            }
          </ul>
        </nav>
      </div>
    </div>
  )
}


export default Nav
