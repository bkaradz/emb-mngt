import ProductsList from './ProductsList'
import ProductsCards from './ProductsCards'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllProducts } from '../../../store/features/products/productsSlice'
import MainPageBase from '../MainPageBase'
import { LinearProgress } from '@material-ui/core'

const debug = false

const Products = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllProducts())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const productsData = useSelector((state) => state.entities.products.products)

  const isLoading = useSelector((state) => state.entities.products.loading)

  if (debug) console.log(isLoading)
  if (debug) console.log(productsData)

  let showListItems = useSelector((state) => state.ui.ui.showListItems)

  if (isLoading) {
    return (
      <MainPageBase>
        <LinearProgress color='primary' />
      </MainPageBase>
    )
  }
  return <>{showListItems ? <ProductsList productsData={productsData} /> : <ProductsCards productsData={productsData} />}</>
}

export default Products
