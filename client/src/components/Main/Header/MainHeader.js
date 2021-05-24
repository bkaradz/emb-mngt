import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

const MainHeader = (props) => {
  const showBreadcrumbs = props.showBreadcrumbs // Breadcrumbs links
  // console.log(showBreadcrumbs)
  const showListFn = props.showListFn // Show List or Cards Function
  const [showSearch, setShowSearch] = useState(false)
  const [nameCreateBtn, setNameBtnCreate] = useState('Create')
  const [nameImportBtn, setNameBtnImport] = useState('Import')
  const [showImportBtn, setShowImportBtn] = useState(false)
  const [showListOrCardItem, setShowListOrCardItem] = useState(false)
  const [showPagination, setShowPagination] = useState(false)

  useEffect(() => {
    setShowSearch(JSON.parse(props.showSearch))
  }, [props.showSearch])
  useEffect(() => {
    setShowImportBtn(JSON.parse(props.showImportBtn))
  }, [props.showImportBtn])
  useEffect(() => {
    setShowListOrCardItem(JSON.parse(props.showListOrCardItem))
  }, [props.showListOrCardItem])
  useEffect(() => {
    setShowPagination(JSON.parse(props.showPagination))
  }, [props.showPagination])
  useEffect(() => {
    setNameBtnCreate(props.nameCreateBtn)
  }, [props.nameCreateBtn])
  useEffect(() => {
    setNameBtnImport(props.nameImportBtn)
  }, [props.nameImportBtn])

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
        <div className='col-6'>
          <div className={`dropdown input-group pe-3 py-3 input-group-sm ${!showSearch ? 'd-none' : ''}`}>
            <button className='btn btn-outline-secondary dropdown-toggle' type='button' data-bs-toggle='dropdown' aria-expanded='false'>
              Dropdown
            </button>
            <ul className='dropdown-menu'>
              <li>
                <a className='dropdown-item' href='#'>
                  Action
                </a>
              </li>
              <li>
                <a className='dropdown-item' href='#'>
                  Another action
                </a>
              </li>
              <li>
                <a className='dropdown-item' href='#'>
                  Something else here
                </a>
              </li>
              <li>
                <hr className='dropdown-divider' />
              </li>
              <li>
                <a className='dropdown-item' href='#'>
                  Separated link
                </a>
              </li>
            </ul>
            <input type='text' className='form-control' aria-label='Text input with dropdown button' />
          </div>
        </div>
      </div>

      <div className='row gx-0'>
        <div className='col-3'>
          <button className='btn btn-primary btn-sm ms-3 mt-1 mb-3'>{nameCreateBtn}</button>
          <button className={`btn btn-secondary btn-sm ms-3 mt-1 mb-3 ${!showImportBtn ? 'd-none' : ''}`}>{nameImportBtn}</button>
        </div>
        <div className='col'></div>
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
        <div className={`col-2 ${!showPagination ? 'd-none' : ''}`}>
          <ul className='pagination float-end pe-3'>
            <li className='page-item'>
              <a className='page-link' href='#' aria-label='Previous'>
                <span aria-hidden='true'>&laquo;</span>
              </a>
            </li>
            <li className='page-item'>
              <a className='page-link' href='#'>
                1
              </a>
            </li>
            <li className='page-item'>
              <a className='page-link' href='#'>
                2
              </a>
            </li>
            <li className='page-item'>
              <a className='page-link' href='#'>
                3
              </a>
            </li>
            <li className='page-item'>
              <a className='page-link' href='#' aria-label='Next'>
                <span aria-hidden='true'>&raquo;</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <hr className='bg-primary border-2 border-top border-primary m-0 p-0' />
    </div>
  )
}

export default MainHeader
