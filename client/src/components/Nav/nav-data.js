import React from 'react'
import { FaChartLine, FaRegAddressCard, FaCoins } from 'react-icons/fa'
import { BiChip } from 'react-icons/bi'

export const links = [
  {
    id: 1,
    icon: <FaChartLine />,
    url: '/',
    text: 'Dashboard',
    children: [],
  },
  {
    id: 2,
    icon: <FaRegAddressCard />,
    url: '/customers',
    text: 'Customers',
    children: [],
  },
  {
    id: 3,
    icon: <FaCoins />,
    url: '/sales',
    text: 'Sales',
    children: [
      {
        id: 30,
        icon: <FaChartLine />,
        url: '/sales/quotation',
        text: 'Quotation',
        children: [],
      },
      {
        id: 31,
        icon: <FaChartLine />,
        url: '/sales/sales',
        text: 'Sales',
        children: [],
      },
      {
        id: 32,
        icon: <FaChartLine />,
        url: '/sales/invoices',
        text: 'Invoices',
        children: [],
      },
    ],
  },
  {
    id: 4,
    icon: <BiChip />,
    url: '/products',
    text: 'Products',
    children: [
      {
        id: 30,
        icon: <FaChartLine />,
        url: '/sales/quotation',
        text: 'Quotation',
        children: [],
      },
      {
        id: 31,
        icon: <FaChartLine />,
        url: '/sales/sales',
        text: 'Sales',
        children: [],
      },
      {
        id: 32,
        icon: <FaChartLine />,
        url: '/sales/invoices',
        text: 'Invoices',
        children: [],
      },
    ],
  },

  {
    id: 5,
    icon: <BiChip />,
    url: '/settings',
    text: 'settings',
    children: [
      {
        id: 30,
        icon: <FaChartLine />,
        url: '/settings/users',
        text: 'Users',
        children: [],
      },
    ],
  },
]
