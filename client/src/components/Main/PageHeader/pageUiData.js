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
    buttonShow: false,
    buttons: [],
    listShow: false,
  },
  '/settings/users': {
    breadcrumbs: [
      { title: 'Home', url: '/' },
      { title: 'Users', url: '/settings/users' },
    ],
    headerTitle: 'Users',
    buttonShow: true,
    buttons: [{ name: 'Create', link: '/settings/user/create' }],
    listShow: false,
  },
}
