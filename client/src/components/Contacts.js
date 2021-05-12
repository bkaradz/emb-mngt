import React from 'react'
import { Breadcrumb, Button, Pagination, InputGroup, FormControl } from "react-bootstrap";

const Contacts = () => {
  return (
    <div className="main">
      <div className="main__header">
        <div className="main--breadcrumb__search">
          <Breadcrumb >
            <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
              Library
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Data</Breadcrumb.Item>
          </Breadcrumb>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Search"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
        </div>
        <div className="main--form__btn">
          <Button size="sm">Create</Button>

          <Pagination size="sm">
            <Pagination.First />
            <Pagination.Prev />
            <Pagination.Item>{1}</Pagination.Item>
            <Pagination.Ellipsis />

            <Pagination.Item>{10}</Pagination.Item>
            <Pagination.Item>{11}</Pagination.Item>
            <Pagination.Item active>{12}</Pagination.Item>
            <Pagination.Item>{13}</Pagination.Item>
            <Pagination.Item disabled>{14}</Pagination.Item>

            <Pagination.Ellipsis />
            <Pagination.Item>{20}</Pagination.Item>
            <Pagination.Next />
            <Pagination.Last /></Pagination>
        </div>
      </div>
      <div className="main__content">
        
      </div>
    </div>
  )
}

export default Contacts
