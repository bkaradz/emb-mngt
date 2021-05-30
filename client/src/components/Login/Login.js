import { InputGroup, DropdownButton, Dropdown, FormControl, Button } from 'react-bootstrap-v5'
import { BiUser } from 'react-icons/bi'

function Login() {
  return (
    <div className='main'>
      <InputGroup className='my-3 input-group-sm'>
        <DropdownButton variant='outline-secondary' title='Dropdown' id='input-group-dropdown-1'>
          <Dropdown.Item href='#'>Action</Dropdown.Item>
          <Dropdown.Item href='#'>Another action</Dropdown.Item>
          <Dropdown.Item href='#'>Something else here</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href='#'>Separated link</Dropdown.Item>
        </DropdownButton>
        <FormControl aria-label='Text input with dropdown button' />
      </InputGroup>

      <InputGroup className='mb-3'>
        <FormControl aria-label='Text input with dropdown button' />

        <DropdownButton variant='outline-secondary' title='Dropdown' id='input-group-dropdown-2' align='end'>
          <Dropdown.Item href='#'>Action</Dropdown.Item>
          <Dropdown.Item href='#'>Another action</Dropdown.Item>
          <Dropdown.Item href='#'>Something else here</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href='#'>Separated link</Dropdown.Item>
        </DropdownButton>
      </InputGroup>

      <InputGroup className='mb-3'>
        <DropdownButton variant='outline-secondary' title='Dropdown' id='input-group-dropdown-3'>
          <Dropdown.Item href='#'>Action</Dropdown.Item>
          <Dropdown.Item href='#'>Another action</Dropdown.Item>
          <Dropdown.Item href='#'>Something else here</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href='#'>Separated link</Dropdown.Item>
        </DropdownButton>
        <FormControl aria-label='Text input with 2 dropdown buttons' />
        <DropdownButton variant='outline-secondary' title='Dropdown' id='input-group-dropdown-4' align='end'>
          <Dropdown.Item href='#'>Action</Dropdown.Item>
          <Dropdown.Item href='#'>Another action</Dropdown.Item>
          <Dropdown.Item href='#'>Something else here</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href='#'>Separated link</Dropdown.Item>
        </DropdownButton>
      </InputGroup>

      <InputGroup className='mb-3'>
        <DropdownButton variant='outline-primary' title='Dropdown' id='input-group-dropdown-3'>
          <Dropdown.Item href='#'>Action</Dropdown.Item>
          <Dropdown.Item href='#'>Another action</Dropdown.Item>
          <Dropdown.Item href='#'>Something else here</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href='#'>Separated link</Dropdown.Item>
        </DropdownButton>
        <FormControl aria-label='Text input with 2 dropdown buttons' />
        <Button type='button' className='btn btn-outline-secondary btn-secondary' id='input-group-dropdown-4' align='end'>
          {' '}
          <BiUser />{' '}
        </Button>
      </InputGroup>
    </div>
  )
}

export default Login
