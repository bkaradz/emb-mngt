export const uiStates = {
  '/': {
    breadcrumbs: [{ title: 'Home', url: '/' }],
    headerTitle: 'Dashboard',
    buttonShow: false,
    buttons: [],
    listShow: false,
  },
  '/messages': {
    breadcrumbs: [
      { title: 'Home', url: '/' },
      { title: 'Messages', url: '/messages' },
    ],
    headerTitle: 'Messages',
    buttonShow: true,
    buttons: [{ name: 'Create', link: '/messages/create' }],
    listShow: false,
  },
  '/customers': {
    breadcrumbs: [
      { title: 'Home', url: '/' },
      { title: 'Customers', url: '/customers' },
    ],
    headerTitle: 'Customers',
    buttonShow: true,
    buttons: [{ name: 'Create', link: '/customers/create' }],
    listShow: true,
  },
  '/customer/view': {
    breadcrumbs: [
      { title: 'Home', url: '/' },
      { title: 'Customers', url: '/customers' },
      { title: 'View', url: '/customers/view' },
    ],
    headerTitle: 'View Customer',
    buttonShow: false,
    buttons: [{ name: 'Create', link: '/customers/create' }],
    listShow: false,
  },
  '/customer/edit': {
    breadcrumbs: [
      { title: 'Home', url: '/' },
      { title: 'Customers', url: '/customers' },
      { title: 'Edit', url: '/customers/edit' },
    ],
    headerTitle: 'Edit Customer',
    buttonShow: false,
    buttons: [{ name: 'Create', link: '/customers/create' }],
    listShow: false,
  },
  '/customer/create': {
    breadcrumbs: [
      { title: 'Home', url: '/' },
      { title: 'Customers', url: '/customers' },
      { title: 'Create', url: '/customers/create' },
    ],
    headerTitle: 'Create Customer',
    buttonShow: false,
    buttons: [{ name: 'Create', link: '/customers/create' }],
    listShow: false,
  },
  '/sales': {
    breadcrumbs: [
      { title: 'Home', url: '/' },
      { title: 'Sales', url: '/sales' },
    ],
    headerTitle: 'Sales',
    buttonShow: false,
    buttons: [{ name: 'Create', link: '/sales/create' }],
    listShow: false,
  },
  '/products': {
    breadcrumbs: [
      { title: 'Home', url: '/' },
      { title: 'Products', url: '/products' },
    ],
    headerTitle: 'Products',
    buttonShow: false,
    buttons: [{ name: 'Create', link: '/product/create' }],
    listShow: false,
  },
  '/product/view': {
    breadcrumbs: [
      { title: 'Home', url: '/' },
      { title: 'Products', url: '/products' },
      { title: 'View', url: '/products/view' },
    ],
    headerTitle: 'View Product',
    buttonShow: false,
    buttons: [{ name: 'Create', link: '/product/create' }],
    listShow: false,
  },
  '/product/edit': {
    breadcrumbs: [
      { title: 'Home', url: '/' },
      { title: 'Products', url: '/products' },
      { title: 'Edit', url: '/product/edit' },
    ],
    headerTitle: 'Edit Product',
    buttonShow: false,
    buttons: [{ name: 'Create', link: '/product/create' }],
    listShow: false,
  },
  '/product/create': {
    breadcrumbs: [
      { title: 'Home', url: '/' },
      { title: 'Products', url: '/products' },
      { title: 'Create', url: '/product/create' },
    ],
    headerTitle: 'Create Product',
    buttonShow: false,
    buttons: [{ name: 'Create', link: '/product/create' }],
    listShow: false,
  },
  '/production': {
    breadcrumbs: [
      { title: 'Home', url: '/' },
      { title: 'Production', url: '/production' },
    ],
    headerTitle: 'Production',
    buttonShow: false,
    buttons: [{ name: 'Create', link: '/product/create' }],
    listShow: false,
  },
  '/settings': {
    breadcrumbs: [
      { title: 'Home', url: '/' },
      { title: 'Users', url: '/settings' },
    ],
    headerTitle: 'Settings',
    buttonShow: true,
    buttons: [{ name: 'Create', link: '/settings/user/create' }],
    listShow: false,
  },
  '/settings/users': {
    breadcrumbs: [
      { title: 'Home', url: '/' },
      { title: 'Users', url: '/settings/users' },
    ],
    headerTitle: 'Users Settings',
    buttonShow: true,
    buttons: [{ name: 'Create', link: '/settings/user/create' }],
    listShow: false,
  },
  '/undefined': {
    breadcrumbs: [{ title: 'Home', url: '/' }],
    headerTitle: 'Undefined',
    buttonShow: false,
    buttons: [{ name: 'Create', link: '/settings/user/create' }],
    listShow: false,
  },
}
