import PageHeader from '../PageHeader/PageHeader'

import { Grid, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // display: 'flex',
    flexDirection: 'column',
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    marginTop: theme.spacing(1),
    display: 'flex',
    height: '100%',
    width: '100%',
    elevation: 3,
  },
}))

function Customer(props) {
  const classes = useStyles()

  return (
    <Grid container className={classes.root}>
      <PageHeader />
      <Grid container>
        <Paper className={classes.paper}>{props.children}</Paper>
      </Grid>
    </Grid>
  )
}

export default Customer
