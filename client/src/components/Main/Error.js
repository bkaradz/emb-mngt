import { Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import MainPageBase from './MainPageBase'

const useStyles = makeStyles({
  root: {
    // minWidth: '100%',
    height: 'calc(100% - 80px)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
})

const Error = () => {
  const classes = useStyles()
  return (
    <MainPageBase>
      {/* <Grid display='flex' justify='center' alignItems='center'> */}
      <Grid className={classes.root} align='center'>
        <Typography variant='h1' component='h2' color='error'>
          Error Page Found
        </Typography>
        {/* <h1></h1> */}
      </Grid>
      {/* </Grid> */}
    </MainPageBase>
  )
}

export default Error
