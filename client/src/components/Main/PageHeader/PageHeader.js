// import React, { useState, useEffect } from 'react'
<<<<<<< HEAD
import { NavLink, useLocation, useParams, useHistory } from 'react-router-dom'
=======
import { useLocation, useParams, NavLink } from 'react-router-dom'
>>>>>>> f37055985efaf377c8df941b6cf918272f8cb0dc
import { emphasize, withStyles, makeStyles } from '@material-ui/core/styles'
import { IconButton, Paper, Chip, Button, ButtonGroup, Box, Breadcrumbs } from '@material-ui/core'
import { ViewModule as ViewModuleIcon, ViewList as ViewListIcon, Home as HomeIcon } from '@material-ui/icons'
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
  breadcrumbs: {
    marginTop: theme.spacing(1.4),
    marginBottom: theme.spacing(1.4),
  },
}))

const PageHeader = () => {
  const history = useHistory()
  const classes = useStyles()
  const { id } = useParams()
<<<<<<< HEAD

  const dispatch = useDispatch()
  let location = useLocation().pathname.replace(`/${id}`, '')
=======
  let location = useLocation().pathname
  location = location.replace(`/${id}`, '')
  const dispatch = useDispatch()
>>>>>>> f37055985efaf377c8df941b6cf918272f8cb0dc

  if (debug) console.log(location.replace(`/${id}`, ''))
  if (debug) console.log(location)

  useEffect(() => {
    dispatch(getCurrentUiState(location))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

<<<<<<< HEAD
  const crumbLinks = useSelector((state) => state.ui.ui.currentUI.breadcrumbs)
  const buttons = useSelector((state) => state.ui.ui.currentUI.buttons)
  const showButton = useSelector((state) => state.ui.ui.currentUI.buttonShow)
  const showList = useSelector((state) => state.ui.ui.currentUI.listShow)

  if (debug) console.log(showButton)
  if (debug) console.log(showList)
  if (debug) console.log(crumbLinks)

  const handleClick = ({ link, name }) => {
    // e.preventDefault()
    // console.log(e.target)
    console.log(link)
    console.log(name)
    if (name === 'Create') {
      history.push(link)
    }
  }
=======
  const breadcrumb = useSelector((state) => state.ui.ui.currentUI.breadcrumbs)

  const crumbLength = breadcrumb.length

  const handleClick = (e) => {}
>>>>>>> f37055985efaf377c8df941b6cf918272f8cb0dc

  return (
    <Paper className={classes.paper}>
      <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center'>
        <div className={classes.breadcrumbs}>
          <Breadcrumbs aria-label='breadcrumb'>
<<<<<<< HEAD
            {crumbLinks.map((crumb, index) => {
              const { title, url } = crumb
              return (
                <NavLink key={index} exact to={url}>
=======
            {/* <StyledBreadcrumb label='Home' href='#' onClick={handleClick} component='a' icon={<HomeIcon fontSize='small' />} />
            <StyledBreadcrumb label='Catalog' href='#' onClick={handleClick} component='a' />
            <StyledBreadcrumb label='Accessories' onClick={handleClick} onDelete={handleClick} deleteIcon={<ExpandMoreIcon />} /> */}
            {breadcrumb.map((crumb, index) => {
              const { title, url } = crumb
              let linkState = crumbLength - 1 === index
              return (
                // isActive={crumbLength === index}
                <NavLink key={index} exact to={url} disabled={linkState}>
>>>>>>> f37055985efaf377c8df941b6cf918272f8cb0dc
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
          <ButtonGroup variant='contained' size='small' aria-label='small contained primary button group' hidden={!showButton}>
            {buttons.map((btn, index) => {
              const { name, link } = btn
              return (
                <Button key={index} onClick={(e) => handleClick({ e, link, name })}>
                  {name}
                </Button>
              )
            })}
          </ButtonGroup>
        </div>
        <div>
          <Box display='flex' flexDirection='row' justify='space-between' hidden={!showList}>
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
        </div>
      </Box>
    </Paper>
  )
}

export default PageHeader
