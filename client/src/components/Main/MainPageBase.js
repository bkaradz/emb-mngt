import PageHeader from './PageHeader/PageHeader'

import { Grid, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,

    height: '100%',
    flexDirection: 'column',
    backgroundColor: 'hsl(198, 17%, 33%)',
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    marginTop: theme.spacing(1),

    backgroundColor: '#eeeeee',
    width: '100%',
    elevation: 3,
  },
  grid: {
    height: 'calc(100% - 80px)',
  },
}))

function MainPageBase(props) {
  const classes = useStyles()

  return (
    <Grid container className={classes.root}>
      <PageHeader />
      <Grid container alignItems='stretch' className={classes.grid}>
        <Paper className={classes.paper}>{props.children}</Paper>
      </Grid>
    </Grid>
  )
}

export default MainPageBase
