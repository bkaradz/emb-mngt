import React from 'react'

import EmailIcon from '@material-ui/icons/Email'
import DashboardIcon from '@material-ui/icons/Dashboard'
import ContactPhoneIcon from '@material-ui/icons/ContactPhone'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
import MemoryIcon from '@material-ui/icons/Memory'
import SettingsIcon from '@material-ui/icons/Settings'
import PeopleIcon from '@material-ui/icons/People'
import BuildIcon from '@material-ui/icons/Build'
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck'
import LocalOfferIcon from '@material-ui/icons/LocalOffer'
import AutorenewIcon from '@material-ui/icons/Autorenew'

export const links = [
  {
    id: 1,
    icon: <DashboardIcon />,
    url: '/',
    text: 'Dashboard',
    children: [],
  },
  {
    id: 2,
    icon: <EmailIcon />,
    url: '/messages',
    text: 'Messages',
    children: [],
  },
  {
    id: 3,
    icon: <ContactPhoneIcon />,
    url: '/customers',
    text: 'Customers',
    children: [],
  },
  {
    id: 4,
    icon: <MonetizationOnIcon />,
    url: '/sales',
    text: 'Sales',
    children: [
      {
        id: 40,
        icon: <AutorenewIcon />,
        url: '/sales/quotation',
        text: 'Quotation',
        children: [],
      },
      {
        id: 41,
        icon: <AutorenewIcon />,
        url: '/sales/sales',
        text: 'Sales',
        children: [],
      },
      {
        id: 42,
        icon: <AutorenewIcon />,
        url: '/sales/invoices',
        text: 'Invoices',
        children: [],
      },
    ],
  },
  {
    id: 5,
    icon: <MemoryIcon />,
    url: '/products',
    text: 'Products',
    children: [
      {
        id: 50,
        icon: <AutorenewIcon />,
        url: '/sales/quotation',
        text: 'Quotation',
        children: [],
      },
      {
        id: 51,
        icon: <AutorenewIcon />,
        url: '/sales/sales',
        text: 'Sales',
        children: [],
      },
      {
        id: 52,
        icon: <AutorenewIcon />,
        url: '/sales/invoices',
        text: 'Invoices',
        children: [],
      },
    ],
  },

  {
    id: 6,
    icon: <BuildIcon />,
    url: '/production',
    text: 'Production',
    children: [
      {
        id: 60,
        icon: <PlaylistAddCheckIcon />,
        url: '/production/list',
        text: 'Prod List',
        children: [],
      },
    ],
  },
  {
    id: 7,
    icon: <SettingsIcon />,
    url: '/settings',
    text: 'settings',
    children: [
      {
        id: 70,
        icon: <PeopleIcon />,
        url: '/settings/users',
        text: 'Users',
        children: [],
      },
      {
        id: 71,
        icon: <LocalOfferIcon />,
        url: '/settings/price_list',
        text: 'Price List',
        children: [],
      },
    ],
  },
]
