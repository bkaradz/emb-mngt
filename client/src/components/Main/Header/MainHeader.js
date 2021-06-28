import React, { useState, useEffect } from 'react'
import { NavLink, useHistory } from 'react-router-dom'

const MainHeader = (props) => {
  const history = useHistory()
  const showBreadcrumbs = props.showBreadcrumbs // Breadcrumbs links
  // console.log(showBreadcrumbs)
  const showListFn = props.showListFn // Show List or Cards Function

  const [nameCreateBtn, setNameBtnCreate] = useState('Create')
  const [nameImportBtn, setNameBtnImport] = useState('Import')
  const [showImportBtn, setShowImportBtn] = useState(false)
  const [showListOrCardItem, setShowListOrCardItem] = useState(false)

  useEffect(() => {
    setShowImportBtn(JSON.parse(props.showImportBtn))
  }, [props.showImportBtn])
  useEffect(() => {
    setShowListOrCardItem(JSON.parse(props.showListOrCardItem))
  }, [props.showListOrCardItem])

  useEffect(() => {
    setNameBtnCreate(props.nameCreateBtn)
  }, [props.nameCreateBtn])
  useEffect(() => {
    setNameBtnImport(props.nameImportBtn)
  }, [props.nameImportBtn])

  const handleClick = (e) => {
    const buttonState = e.target.innerHTML
    // console.log(buttonState)
    if (buttonState.toLowerCase() === 'create') {
      let editUrl = window.location.pathname
      // console.log(editUrl)
      editUrl = editUrl.replace('contacts', 'contacts/create')
      // console.log(editUrl)
      // window.location.assign(editUrl)
      history.push(editUrl)
    }
    if (buttonState.toLowerCase() === 'edit') {
      let editUrl = window.location.pathname
      // console.log(editUrl)
      editUrl = editUrl.replace('view', 'edit')
      // console.log(editUrl)
      // window.location.assign(editUrl)
      history.push(editUrl)
    }
  }

  return (
    <div className='main--header container-fluid'>
      <div className='row gx-0'>
        <div className='col-6 '>
          <ol className='breadcrumb ps-3 pt-3 '>
            {showBreadcrumbs !== undefined
              ? showBreadcrumbs.link.map((breadcrumb, index) => {
                  const { name, url } = breadcrumb
                  return (
                    <li key={index} className={`breadcrumb-item ${url === '#' ? 'active' : ''}`}>
                      <NavLink exact to={url}>
                        {name}
                      </NavLink>
                    </li>
                  )
                })
              : ''}
          </ol>
        </div>
        <div className='col-3'>
          <button onClick={(e) => handleClick(e)} className='btn btn-primary btn-sm ms-3 mt-1 mb-3'>
            {nameCreateBtn}
          </button>
          <button onClick={(e) => handleClick(e)} className={`btn btn-secondary btn-sm ms-3 mt-1 mb-3 ${!showImportBtn ? 'd-none' : ''}`}>
            {nameImportBtn}
          </button>
        </div>
        <div className={`d-flex col-1 justify-content-between pb-2 ${!showListOrCardItem ? 'd-none' : ''}`}>
          <button className='btn btn-sm m-0 p-0 text-primary' onClick={() => showListFn('true')}>
            <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' fill='currentColor' className='bi bi-list' viewBox='0 0 16 16'>
              <path
                fillRule='evenodd'
                d='M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z'
              />
            </svg>
          </button>
          <button className='btn btn-sm m-0 p-0 text-primary' onClick={() => showListFn('false')}>
            <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' fill='currentColor' className='bi bi-card-list' viewBox='0 0 16 16'>
              <path d='M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z' />
              <path d='M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z' />
            </svg>
          </button>
        </div>
      </div>

      <div className='row gx-0'>
        <div className='col'></div>
      </div>
      <hr className='bg-primary border-2 border-top border-primary m-0 p-0' />
    </div>
  )
}

export default MainHeader
