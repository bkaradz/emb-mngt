// import React, { useState, useEffect } from 'react'
import { useLocation, useParams, NavLink } from 'react-router-dom'
import { emphasize, withStyles, makeStyles } from '@material-ui/core/styles'
import { IconButton, Paper, Chip, Button, ButtonGroup, Box, Breadcrumbs } from '@material-ui/core'
import { ViewModule as ViewModuleIcon, ViewList as ViewListIcon, Home as HomeIcon, ExpandMore as ExpandMoreIcon } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { changeShowListItem, getCurrentUiState } from '../../../store/features/ui/uiSlice'
import { useEffect } from 'react'

const debug = false

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
    flexDirection: 'column',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    elevation: 3,
  },
}))

const PageHeader = () => {
  const classes = useStyles()
  const { id } = useParams()
  let location = useLocation().pathname
  location = location.replace(`/${id}`, '')
  const dispatch = useDispatch()

  if (debug) console.log(location.replace(`/${id}`, ''))

  useEffect(() => {
    dispatch(getCurrentUiState(location))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  const breadcrumb = useSelector((state) => state.ui.ui.currentUI.breadcrumbs)

  const crumbLength = breadcrumb.length

  const handleClick = (e) => {}

  return (
    <Paper className={classes.paper}>
      <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center'>
        <div>
          <Breadcrumbs aria-label='breadcrumb'>
            {/* <StyledBreadcrumb label='Home' href='#' onClick={handleClick} component='a' icon={<HomeIcon fontSize='small' />} />
            <StyledBreadcrumb label='Catalog' href='#' onClick={handleClick} component='a' />
            <StyledBreadcrumb label='Accessories' onClick={handleClick} onDelete={handleClick} deleteIcon={<ExpandMoreIcon />} /> */}
            {breadcrumb.map((crumb, index) => {
              const { title, url } = crumb
              let linkState = crumbLength - 1 === index
              return (
                // isActive={crumbLength === index}
                <NavLink key={index} exact to={url} disabled={linkState}>
                  {!index ? (
                    <StyledBreadcrumb label={title} onClick={handleClick} icon={<HomeIcon fontSize='small' />} />
                  ) : (
                    <StyledBreadcrumb label={title} onClick={handleClick} />
                  )}
                </NavLink>
              )
            })}
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
            <IconButton onClick={() => dispatch(changeShowListItem(true))}>
              <ViewListIcon />
            </IconButton>
          </div>
          <div>
            <IconButton onClick={() => dispatch(changeShowListItem(false))}>
              <ViewModuleIcon />
            </IconButton>
          </div>
        </Box>
      </Box>
    </Paper>
  )
}

export default PageHeader
