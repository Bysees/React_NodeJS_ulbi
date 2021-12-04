import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Context } from '..'
import BrandBar from '../components/BrandBar'
import DeviceList from '../components/DeviceList'
import Paginator from '../components/Paginator'
import TypeBar from '../components/TypeBar'
import { fetchBrands, fetchDevices, fetchTypes } from '../http/deviceApi'

const Shop = observer(() => {
  const { device } = useContext(Context)

  useEffect(() => {
    ;(async () => {
      const types = await fetchTypes()
      const brands = await fetchBrands()
      const devices = await fetchDevices()
      device.setDevices(devices.rows)
      device.setTotalCount(devices.count)
      device.setTypes(types)
      device.setBrands(brands)
    })()
  }, [device])

  useEffect(() => {
    ;(async () => {
      const devices = await fetchDevices(
        device.selectedBrand.id,
        device.selectedType.id,
        device.limit,
        device.page
      )
      device.setDevices(devices.rows)
      device.setTotalCount(devices.count)
    })()
  }, [device.page, device.selectedType.id, device.selectedBrand.id, device])

  return (
    <Container>
      <Row className='mt-4'>
        <Col md='3'>
          <TypeBar />
        </Col>
        <Col md='9'>
          <BrandBar />
          <DeviceList />
          <Paginator />
        </Col>
      </Row>
    </Container>
  )
})

export default Shop
