import React, { useEffect } from 'react'

import { IconButton } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { DataGrid } from '@material-ui/data-grid'
import { NavLink } from 'react-router-dom'
import { Edit as EditIcon } from '@material-ui/icons'
import { getAllUsers } from '../../../store/features/users/usersSlice'
import MainPageBase from '../MainPageBase'

function Users() {
  const dispatch = useDispatch()

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
    // {
    //   field: 'view',
    //   headerName: 'View',
    //   sortable: false,
    //   width: 90,
    //   disableClickEventBubbling: true,
    //   renderCell: (params) => {
    //     // console.log(params.id)
    //     return (
    //       <IconButton size='small'>
    //         <NavLink exact to={`/product/view/${params.id}`}>
    //           <VisibilityIcon fontSize='small' /> Show
    //         </NavLink>
    //       </IconButton>
    //     )
    //   },
    // },
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
  ]

  return (
    <MainPageBase>
      <DataGrid getRowId={(row) => row._id} rows={rows} columns={columns} autoPageSize={true} checkboxSelection disableSelectionOnClick />
    </MainPageBase>
  )
}

export default Users
