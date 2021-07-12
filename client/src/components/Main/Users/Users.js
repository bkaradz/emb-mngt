import React, { useEffect } from 'react'
import PageHeader from '../PageHeader/PageHeader'
import { IconButton, Paper, makeStyles } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { DataGrid } from '@material-ui/data-grid'
import { NavLink } from 'react-router-dom'
import { Visibility as VisibilityIcon, Edit as EditIcon } from '@material-ui/icons'
import { getAllUsers } from '../../../store/features/users/usersSlice'

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

function Users() {
  const dispatch = useDispatch()
  const classes = useStyles()

  const getData = async () => {
    try {
      const resp = await axios.get('/api/users')

      dispatch(getAllUsers(resp.data))
    } catch (err) {
      console.error(err.response.data)
      // console.error(`Server Error: ${err.response.data}`)
    }
  }

  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const rows = useSelector((state) => state.entities.users.users)

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
      field: 'role',
      headerName: 'Role',
      width: 150,
      editable: false,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 250,
      editable: false,
    },
    {
      field: 'mobile',
      headerName: 'Mobile',
      width: 250,
      editable: false,
    },
    {
      field: 'IsDeleted',
      headerName: 'Deleted',
      type: 'boolean',
      width: 150,
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
            <NavLink exact to={`/product/view/${params.id}`}>
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
            <NavLink exact to={`/product/edit/${params.id}`}>
              <EditIcon fontSize='small' /> Edit
            </NavLink>
          </IconButton>
        )
      },
    },
  ]

  return (
    <div className='main'>
      <PageHeader />
      <Paper className={classes.paper}>
        <DataGrid getRowId={(row) => row._id} rows={rows} columns={columns} autoPageSize={true} checkboxSelection disableSelectionOnClick />
      </Paper>
    </div>
  )
}

export default Users
