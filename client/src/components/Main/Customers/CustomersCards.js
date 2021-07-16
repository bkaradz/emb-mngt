import { Button, Card, CardActions, CardContent, CardMedia, makeStyles, Typography, useTheme } from '@material-ui/core'
import MainPageBase from '../MainPageBase'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 340,
    maxHeight: 100,
    display: 'flex',
  },
  cover: {
    height: 90,
    width: 90,
    margin: theme.spacing(0.5),
  },
  title: {
    fontSize: 15,
    // margin: theme.spacing(0.5),
    margin: theme.spacing(0),
    marginTop: 0,
    padding: theme.spacing(0),
  },
  pos: {
    fontSize: 12,
    // marginBottom: 12,
  },
  content: {
    padding: theme.spacing(1),
  },
}))

function CustomersCards({ customersData }) {
  const classes = useStyles()
  return (
    <MainPageBase>
      <Card className={classes.root} variant='outlined'>
        <CardMedia
          className={classes.cover}
          image='https://material-ui.com/static/images/cards/contemplative-reptile.jpg'
          title='Live from space album cover'
        />
        <CardContent className={classes.content}>
          <Typography className={classes.title} color='textSecondary'>
            Word of the Day
          </Typography>
          <Typography className={classes.pos} color='textSecondary'>
            adjective
          </Typography>
          <Typography variant='body2' component='p'>
            well meaning and kindly.
          </Typography>
        </CardContent>
      </Card>
    </MainPageBase>
  )
}

export default CustomersCards

// {
//   customersData.map((customer) => {
//     const { _id, isCompany, name, email, phone, balance } = customer
//     return (
//       <div key={_id}>
//         <p>{name}</p>
//       </div>
//     )
//   })
// }
