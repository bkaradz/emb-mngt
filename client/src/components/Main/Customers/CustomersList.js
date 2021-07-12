import { NavLink } from 'react-router-dom'
import { DataGrid } from '@material-ui/data-grid'
import { Visibility as VisibilityIcon, Edit as EditIcon } from '@material-ui/icons'
import { IconButton, Paper, makeStyles } from '@material-ui/core'
// import { makeStyles } from '@material-ui/core/styles'

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

// import MainHeader from '../Header/MainHeader'
// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { Grid, TextField, Paper, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Avatar, Button } from '@material-ui/core'
// import { makeStyles } from '@material-ui/styles'
// import { deepOrange, lightBlue, grey } from '@material-ui/core/colors'
// import avatarImage from '../../../assets/avatar.png'
// import { useSelector } from 'react-redux'

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     // display: 'flex',
//     flexDirection: 'column',
//     '& .MuiFormControl-root': {
//       width: '95%',
//       margin: theme.spacing(1),
//     },
//     '& .MuiButton-root': {
//       width: '95%',
//       margin: theme.spacing(1),
//     },
//   },
//   paper: {
//     padding: theme.spacing(2),
//     margin: theme.spacing(2),
//     marginTop: theme.spacing(1),
//     display: 'flex',
//     height: '100%',
//     elevation: 3,
//   },
//   large: {
//     width: theme.spacing(10),
//     height: theme.spacing(10),
//     // padding: theme.spacing(7),
//     marginRight: theme.spacing(2),
//     marginLeft: theme.spacing(2),
//     // borderColor: deepOrange[500],
//   },
//   orange: {
//     color: theme.palette.getContrastText(deepOrange[500]),
//     backgroundColor: lightBlue[500],
//   },
// }))

// function ContactView(props) {
//   const classes = useStyles()
//   const { id } = useParams()
//   // console.log(id)
//   // console.log(useSelector((state) => state.entities.customers.customers.filter((customer) => customer._id === id))[0])
//   const user = useSelector((state) => state.entities.customers.customers.filter((customer) => customer._id === id))[0]
//   // const history = useHistory()

//   const initialValues = {
//     isCompany: '',
//     vatOrBpNo: '',
//     name: '',
//     organization: '',
//     phone: '',
//     email: '',
//     address: '',
//     balance: '',
//     rating: '',
//   }

//   const [values, setValues] = useState(initialValues)
//   useEffect(() => {
//     if (user) {
//       setValues({
//         ...values,
//         isCompany: user.isCompany,
//         vatOrBpNo: user.vatOrBpNo,
//         name: user.name,
//         organization: user.organization,
//         phone: user.phone,
//         email: user.email,
//         address: user.address,
//         balance: user.balance,
//         rating: user.rating,
//       })
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [user])
//   console.log(values)

//   const handleInputChange = (e) => {
//     // console.log(e.target)
//     const { name, value } = e.target
//     // console.log(`name: ${name} value: ${value}`)
//     setValues({ ...values, [name]: value })
//   }

//   return (
//     <Grid container className={classes.root} direction='column'>
//       <MainHeader />

//       <Paper className={classes.paper}></Paper>
//     </Grid>
//   )
// }

// export default ContactView
