import React, { useEffect } from 'react'

import { Checkbox, IconButton } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { DataGrid } from '@material-ui/data-grid'
import { NavLink, useLocation } from 'react-router-dom'
import { Edit as EditIcon } from '@material-ui/icons'
import { deleteUser, getAllUsers } from '../../../store/features/users/usersSlice'
import MainPageBase from '../MainPageBase'
import DeleteIcon from '@material-ui/icons/Delete'

const debug = false

function Users() {
  const dispatch = useDispatch()

  let location = useLocation().pathname

  if (debug) console.log(location)

  useEffect(() => {
    dispatch(getAllUsers())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDelete = (id) => {
    // e.preventDefault()
    // console.log(id)
    dispatch(deleteUser({ id }))
    dispatch(getAllUsers())
  }

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
      headerName: 'Is Deleted',
      width: 150,
      renderCell: (props) => {
        return <Checkbox color='primary' disabled checked={props.row.isDeleted} />
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
            <NavLink exact to={`/settings/user/edit/${params.id}`}>
              <EditIcon fontSize='small' /> Edit
            </NavLink>
          </IconButton>
        )
      },
    },
    {
      field: 'delete',
      headerName: 'Delete',
      sortable: false,
      width: 120,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        // console.log(params.id)
        return (
          <IconButton size='small' onClick={(e) => handleDelete(params.id)}>
            {/* <NavLink exact to={`/settings/user/edit/${params.id}`}>
            </NavLink> */}
            <DeleteIcon fontSize='small' /> Delete
          </IconButton>
        )
      },
    },
  ]

  return (
    <MainPageBase>
      <DataGrid getRowId={(row) => row._id} rows={rows} columns={columns} autoPageSize={true} checkboxSelection disableSelectionOnClick />
    </MainPageBase>
  )
}

export default Users
