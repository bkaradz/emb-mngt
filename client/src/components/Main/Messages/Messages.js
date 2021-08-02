import React, { useEffect, useState } from 'react'
import MainPageBase from '../MainPageBase'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../../../store/features/products/productsSlice'
import VirtualAuto from '../VirtualAuto'

const debug = false

export default function Virtualize() {
  const dispatch = useDispatch()
  const [values, setValues] = useState([])
  if (debug) console.log(values)

  useEffect(() => {
    dispatch(getAllProducts())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  let PRODUCTS = useSelector((state) => state.entities.products.products)
  if (debug) console.log(PRODUCTS)

  const handleOnChange = (e, value) => {
    setValues(value)
  }

  const filter = `${'option.stitches'} - ${'option.name'}`

  return (
    <MainPageBase>
      <VirtualAuto props={{ LIST: PRODUCTS, values, handleOnChange: handleOnChange, filterOptions: filter }} />
    </MainPageBase>
  )
}
