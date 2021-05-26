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
    url: '/contacts',
    text: 'Contacts',
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
    children: [],
  },
]
