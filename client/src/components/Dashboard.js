import MainHeader from './Main/Header/MainHeader'

const Dashboard = (props) => {
  const breadcrumb = {
    link: [
      { name: 'Home', url: '/' },
      { name: 'Contacts', url: '/contacts' },
      { name: 'View', url: '#' },
    ],
  }
  return (
    <div className='main'>
      <MainHeader
        showSearch='false'
        nameCreateBtn='Edit'
        nameImportBtn='Discard'
        showImportBtn='false'
        showListOrCardItem='false'
        showPagination='false'
        showBreadcrumbs={breadcrumb}
      />
      <h1>Loading...</h1>
    </div>
  )
}

export default Dashboard
