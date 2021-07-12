// import React, { useState, useEffect } from 'react'
// import { NavLink, useHistory } from 'react-router-dom'
import { emphasize, withStyles, makeStyles } from '@material-ui/core/styles'
import { IconButton, Paper, Chip, Button, ButtonGroup, Box, Breadcrumbs } from '@material-ui/core'
import { ViewModule as ViewModuleIcon, ViewList as ViewListIcon, Home as HomeIcon, ExpandMore as ExpandMoreIcon } from '@material-ui/icons'

const StyledBreadcrumb = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    height: theme.spacing(3),
    color: theme.palette.grey[800],
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.grey[300],
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(theme.palette.grey[300], 0.12),
    },
  },
}))(Chip)

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    backgroundColor: theme.palette.grey[300],
    padding: theme.spacing(1),
    display: 'flex',
    // overflow: 'auto',
    flexDirection: 'column',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    elevation: 3,
  },
}))

const PageHeader = () => {
  const classes = useStyles()
  // const history = useHistory()

  const handleClick = (e) => {
    // const buttonState = e.target.innerHTML
    // if (buttonState.toLowerCase() === 'create') {
    //   let editUrl = window.location.pathname
    //   editUrl = editUrl.replace('contacts', 'contacts/create')
    //   // history.push(editUrl)
    // }
    // if (buttonState.toLowerCase() === 'edit') {
    //   let editUrl = window.location.pathname
    //   editUrl = editUrl.replace('view', 'edit')
    //   // history.push(editUrl)
    // }
  }

  return (
    <Paper className={classes.paper}>
      <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center'>
        <div>
          <Breadcrumbs aria-label='breadcrumb'>
            <StyledBreadcrumb component='a' href='#' label='Home' icon={<HomeIcon fontSize='small' />} onClick={handleClick} />
            <StyledBreadcrumb component='a' href='#' label='Catalog' onClick={handleClick} />
            <StyledBreadcrumb label='Accessories' deleteIcon={<ExpandMoreIcon />} onClick={handleClick} onDelete={handleClick} />
          </Breadcrumbs>
        </div>

        <div className={classes.root}>
          <ButtonGroup variant='contained' size='small' aria-label='small contained primary button group'>
            <Button>Create</Button>
            <Button>Delete</Button>
            <Button>Upload</Button>
          </ButtonGroup>
        </div>

        <Box display='flex' flexDirection='row' justify='space-between'>
          <div>
            <IconButton>
              <ViewListIcon />
            </IconButton>
          </div>
          <div>
            <IconButton>
              <ViewModuleIcon />
            </IconButton>
          </div>
        </Box>
      </Box>
    </Paper>
  )
}

export default PageHeader
