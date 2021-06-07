import MainHeader from './Main/Header/MainHeader'
import { InputGroup, FormControl } from 'react-bootstrap-v5'

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
      <div>
        <InputGroup size='sm' className='mb-3'>
          <InputGroup.Prepend>
            <InputGroup.Text id='inputGroup-sizing-sm'>Small</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl aria-label='Small' aria-describedby='inputGroup-sizing-sm' />
        </InputGroup>
        <br />
      </div>
    </div>
  )
}

export default Dashboard
