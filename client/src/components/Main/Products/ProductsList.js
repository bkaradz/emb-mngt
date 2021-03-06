import { NavLink } from 'react-router-dom'
import { DataGrid } from '@material-ui/data-grid'
import { Visibility as VisibilityIcon, Edit as EditIcon } from '@material-ui/icons'
import { IconButton } from '@material-ui/core'
import MainPageBase from '../MainPageBase'

function Products(productsData) {
  const rows = productsData.productsData

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
