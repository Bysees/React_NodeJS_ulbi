import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Image, Row, Button } from 'react-bootstrap'
import { useParams } from 'react-router'
import bigStar from '../assets/bigStar.png'
import { fetchOneDevice } from '../http/deviceApi'

const DevicePage = () => {
  const [device, setDevice] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    fetchOneDevice(id).then((data) => setDevice(data))
  }, [id])

  if (!device) return <div>Loading...</div>

  return (
    <Container className='mt-5'>
      <Row>
        <Col md='4'>
          <Image
            style={{ objectFit: 'cover' }}
            height={300}
            src={'/' + device.img}
          />
        </Col>
        <Col md='4'>
          <Row className={'flex-column align-items-center'}>
            <h2 style={{ width: 'auto' }}>{device.name}</h2>
            <div
              className={'d-flex align-items-center justify-content-center'}
              style={{
                background: `url(${bigStar}) no-repeat center center`,
                backgroundSize: 'cover',
                width: 240,
                height: 240,
                fontSize: 64,
              }}>
              {device.rating}
            </div>
          </Row>
        </Col>
        <Col md='4' className='d-flex justify-content-end'>
          <Card
            className='align-items-center justify-content-around'
            style={{
              width: 300,
              height: 300,
              fontSize: 32,
              border: '5px solid lightgray',
            }}>
            <h3>От: {device.price} рублей</h3>
            <Button variant='outline-dark'>Добавить в корзину</Button>
          </Card>
        </Col>
      </Row>
      <Row className='mt-3'>
        <h1 style={{ width: 'auto' }}>Характеристики</h1>
        {device.info.map((info, i) => {
          return (
            <Row
              className='p-2'
              key={info.id}
              style={{ background: i % 2 ? 'transparent' : 'lightgray' }}>
              {info.title}: {info.description}
            </Row>
          )
        })}
      </Row>
    </Container>
  )
}

export default DevicePage
