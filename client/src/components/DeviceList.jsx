import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Row } from 'react-bootstrap'
import { Context } from '..'
import DeviceItem from './DeviceItem'

const DeviceList = observer(() => {
  const { device } = useContext(Context)

  return (
    <Row>
      {device.devices.map((item) => {
        return <DeviceItem key={item.id} device={item} />
      })}
    </Row>
  )
})

export default DeviceList
