import { NavLink } from 'react-router-dom'
import { DataGrid } from '@material-ui/data-grid'
import EditIcon from '@material-ui/icons/Edit'
import VisibilityIcon from '@material-ui/icons/Visibility'
import { IconButton, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    height: '90%',
    elevation: 3,
  },
}))

function CustomersList({ customersData }) {
  // console.log(customersData)
  const classes = useStyles()

  if (customersData === null) {
    return (
      <div className='main--content__List'>
        <h1>Loading...</h1>
      </div>
    )
  }

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
        // console.log(params.id)
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

  return (
    // style={{ height: 840, width: '100%' }}
    <Paper className={classes.paper}>
      <DataGrid
        size='small'
        getRowId={(row) => row._id}
        rows={rows}
        columns={columns}
        autoPageSize={true}
        checkboxSelection
        disableSelectionOnClick
      />
    </Paper>
  )
}

export default CustomersList
