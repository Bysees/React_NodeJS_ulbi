import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Pagination } from 'react-bootstrap'
import { Context } from '..'

const Paginator = observer(() => {
  const { device } = useContext(Context)
  const pageCount = Math.ceil(device.totalCount / device.limit)

  let pages = []
  for (let number = 1; number <= pageCount; number++) {
    pages.push(number)
  }

  return (
    <Pagination className={'mt-5'}>
      {pages.length > 1 &&
        pages.map((number) => {
          return (
            <Pagination.Item
              onClick={() => device.setPage(number)}
              key={number}
              active={number === device.page}>
              {number}
            </Pagination.Item>
          )
        })}
    </Pagination>
  )
})

export default Paginator
