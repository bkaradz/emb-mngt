import { Card, Paper, CardContent, CardMedia, Grid, TablePagination, Typography, makeStyles } from '@material-ui/core'
import React, { useState } from 'react'
// import { useDispatch } from 'react-redux'
// import { getAllProducts } from '../../../store/features/products/productsSlice'
import MainPageBase from '../MainPageBase'
import _ from 'lodash'

const debug = false

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 317,
    minHeight: 100,
    maxWidth: 317,
    maxHeight: 100,
    display: 'flex',
  },
  cover: {
    minHeight: 90,
    minWidth: 90,
    margin: theme.spacing(0.5),
  },
  title: {
    fontSize: 15,
    // margin: theme.spacing(0.5),
    margin: theme.spacing(0),
    marginTop: 0,
    padding: theme.spacing(0),
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  pos: {
    fontSize: 12,
    // marginBottom: 12,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  content: {
    padding: theme.spacing(1),
  },
  paper: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
}))

function ProductCards(productsData) {
  const classes = useStyles()
  // const dispatch = useDispatch()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(30)

  // useEffect(() => {
  //   dispatch(getAllProducts())
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  // const productsData = useSelector((state) => state.entities.products.products)

  if (debug) console.log(productsData)

  let productsChunk = _.chunk(productsData.productsData, rowsPerPage)

  if (debug) console.log(productsChunk)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    console.log(event.target.value)
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <MainPageBase>
      <Grid container sx={{ flexGrow: 1 }} spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            {productsChunk[page].map((customer) => {
              const { _id, name, productID, stitches } = customer
              return (
                <Grid item key={_id}>
                  <Card className={classes.root} variant='outlined'>
                    <CardMedia
                      className={classes.cover}
                      image='https://material-ui.com/static/images/cards/contemplative-reptile.jpg'
                      title='Live from space album cover'
                    />
                    <CardContent className={classes.content}>
                      <Typography className={classes.title} color='textSecondary'>
                        {name}
                      </Typography>
                      <Typography className={classes.pos} color='textSecondary'>
                        {productID}
                      </Typography>
                      <Typography variant='body2' component='p' color='primary'>
                        {stitches}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              )
            })}
          </Grid>
          <Paper className={classes.paper}>
            <TablePagination
              component='div'
              count={productsData.productsData.length}
              page={page}
              onChangePage={handleChangePage}
              rowsPerPage={rowsPerPage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 15, 20, 25, 30, 40, 50]}
            />
          </Paper>
        </Grid>
      </Grid>
    </MainPageBase>
  )
}

export default ProductCards
