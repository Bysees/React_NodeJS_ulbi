import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Card, Row } from 'react-bootstrap'
import { Context } from '..'

const BrandBar = observer(() => {
  const { device } = useContext(Context)

  return (
    <Row md='6'>
      <Card
        style={{ cursor: 'pointer' }}
        className='p-3 align-items-center'
        border={
          !device.selectedBrand?.id ? 'primary' : '1px solid rgba(0,0,0,.125)'
        }
        onClick={() => device.setSelectedBrand({})}>
        Все модели
      </Card>
      {device.brands.map((brand) => {
        return (
          <Card
            style={{ cursor: 'pointer' }}
            key={brand.id}
            className='p-3 align-items-center'
            border={
              device.selectedBrand.id === brand.id
                ? 'primary'
                : '1px solid rgba(0,0,0,.125)'
            }
            onClick={() => device.setSelectedBrand(brand)}>
            {brand.name}
          </Card>
        )
      })}
    </Row>
  )
})

export default BrandBar
