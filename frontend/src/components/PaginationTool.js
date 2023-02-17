import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const PaginationTool = ({ totalPages, page, query = '' }) => {
  return (
    totalPages > 1 && (
      <Pagination>
        {[...Array(totalPages).keys()].map((item) => (
          <LinkContainer
            key={item + 1}
            to={
              query ? `/search/${query}/page/${item + 1}` : `/page/${item + 1}`
            }
          >
            <Pagination.Item active={item + 1 === page}>
              {item + 1}
            </Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  )
}

export default PaginationTool
