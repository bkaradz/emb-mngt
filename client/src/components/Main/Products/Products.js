// import React from 'react'
import React, { useEffect } from 'react'
import { IconButton, LinearProgress } from '@material-ui/core'
import { Visibility as VisibilityIcon, Edit as EditIcon } from '@material-ui/icons'
import { DataGrid } from '@material-ui/data-grid'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getAllProducts } from '../../../store/features/products/productsSlice'
import MainPageBase from '../MainPageBase'

function Products() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllProducts())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const rows = useSelector((state) => state.entities.products.products)
  const isLoading = useSelector((state) => state.entities.products.loading)

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
      width: 400,
      editable: false,
    },
    {
      field: 'productID',
      headerName: 'Product ID',
      width: 250,
      editable: false,
    },
    {
      field: 'sales_price',
      headerName: 'Price',
      type: 'number',
      width: 150,
      editable: false,
    },
    {
      field: 'stitches',
      headerName: 'Stitches',
      type: 'number',
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

  if (isLoading) {
    return (
      <MainPageBase>
        <LinearProgress color='primary' />
      </MainPageBase>
    )
  }

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

export default Products
