import React from 'react'
import { Card, Col, Image } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import star from '../assets/star.png'
import { DEVICE_ROUTE } from '../utils/consts'

const DeviceItem = ({ device }) => {
  const history = useNavigate()

  return (
    <Col
      className='align-items-center mt-3'
      md='3'
      onClick={() => history(`${DEVICE_ROUTE}/${device.id}`)}>
      <Card style={{ width: 150, cursor: 'pointer' }} border={'light'}>
        <Image
          style={{ objectFit: 'contain' }}
          height={150}
          src={'/' + device.img}
        />
        <div className='mt-1 d-flex justify-content-between align-items-center'>
          <div className='text-black-50'>tech</div>
          <div className='d-flex align-items-center'>
            <div
              className='me-1'
              style={{ fontSize: '1.1rem', fontWeight: 500 }}>
              {device.rating}
            </div>
            <Image height={16} src={star} />
          </div>
        </div>
        <div>{device.name}</div>
      </Card>
    </Col>
  )
}

export default DeviceItem
