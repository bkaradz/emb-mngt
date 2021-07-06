// import React from 'react'
import React, { useState, useEffect } from 'react'
import MainHeader from '../Header/MainHeader'
import { IconButton, Paper, makeStyles } from '@material-ui/core'
import { Visibility as VisibilityIcon, Edit as EditIcon } from '@material-ui/icons'
import { DataGrid } from '@material-ui/data-grid'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { getAllProducts } from '../../../store/features/products/productsSlice'

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

function Products() {
  const dispatch = useDispatch()
  const classes = useStyles()

  const getData = async () => {
    try {
      axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('jwt')
      const resp = await axios.get('/api/products')

      dispatch(getAllProducts(resp.data))
    } catch (err) {
      console.error(err.response.data)
      // console.error(`Server Error: ${err.response.data}`)
    }
  }

  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const rows = useSelector((state) => state.entities.products.products)

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

  return (
    <div className='main'>
      <MainHeader />
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
    </div>
  )
}

export default Products
