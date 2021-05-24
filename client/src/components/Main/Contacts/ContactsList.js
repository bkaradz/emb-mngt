import { NavLink } from 'react-router-dom'

function ContactsList({ contactsData }) {
  if (contactsData === null) {
    return (
      <div className='main--content__List'>
        <h1>Loading...</h1>
      </div>
    )
  }

  return (
    <div className='main--content__List'>
      <table className='table table-striped table-bordered table-sm table-hover table-responsive'>
        <thead className='table-dark'>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Name</th>
            <th scope='col'>Phone #</th>
            <th scope='col'>Email</th>
            <th scope='col'>Balance</th>
            <th scope='col'>Address</th>
            <th scope='col'>Edit</th>
          </tr>
        </thead>

        <tbody>
          {contactsData.map((contact, index) => {
            const { _id, name, email, phone, address, balance } = contact

            return (
              <tr key={_id}>
                <th scope='row'>{index + 1}</th>
                <td>
                  <NavLink exact to={`/contacts/view/${_id}`}>
                    {name}
                  </NavLink>
                </td>
                <td>{phone}</td>
                <td>{email}</td>
                <td>{balance}</td>
                <td>{address}</td>
                <td>
                  <NavLink exact to={`/contacts/edit/${_id}`}>
                    <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-pencil' viewBox='0 0 16 16'>
                      <path d='M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z' />
                    </svg>
                  </NavLink>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ContactsList
