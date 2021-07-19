import { NavLink } from 'react-router-dom'
import { DataGrid } from '@material-ui/data-grid'
import { Visibility as VisibilityIcon, Edit as EditIcon } from '@material-ui/icons'
import { IconButton } from '@material-ui/core'
import MainPageBase from '../MainPageBase'

function CustomersList({ customersData }) {
  const columns = [
    {
      field: '_id',
      headerName: 'ID',
      width: 150,
      editable: false,
      hide: true,
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 300,
      editable: false,
    },
    {
      field: 'phone',
      headerName: 'Phone',
      width: 300,
      editable: false,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 300,
      editable: false,
    },
    {
      field: 'balance',
      headerName: 'Balance',
      type: 'number',
      width: 140,
      editable: false,
    },
    {
      field: 'address',
      headerName: 'Address',
      width: 300,
      editable: false,
    },
    {
      field: 'view',
      headerName: 'View',
      sortable: false,
      width: 90,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <IconButton size='small'>
            <NavLink exact to={`/customer/view/${params.id}`}>
              <VisibilityIcon fontSize='small' /> Show
            </NavLink>
          </IconButton>
        )
      },
    },
    {
      field: 'edit',
      headerName: 'Edit',
      sortable: false,
      width: 80,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        // console.log(params.id)
        return (
          <IconButton size='small'>
            <NavLink exact to={`/customer/edit/${params.id}`}>
              <EditIcon fontSize='small' /> Edit
            </NavLink>
          </IconButton>
        )
      },
    },
  ]

  const rows = customersData

  // if (customersChunk[page] === undefined) {
  //   return (
  //     <MainPageBase>
  //       <LinearProgress color='secondary' />
  //     </MainPageBase>
  //   )
  // }

  return (
    <MainPageBase>
      <DataGrid
        size='small'
        getRowId={(row) => row._id}
        rows={rows}
        columns={columns}
        autoPageSize={true}
        checkboxSelection
        disableSelectionOnClick
      />
    </MainPageBase>
  )
}

export default CustomersList
