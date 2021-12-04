import React, { useContext, useEffect, useState } from 'react'
import { Modal, Button, Form, Dropdown, Row, Col } from 'react-bootstrap'
import { Context } from '../..'
import { createDevice, fetchBrands, fetchTypes } from '../../http/deviceApi'

const CreateDevice = ({ show, onHide }) => {
  const { device } = useContext(Context)
  const [info, setInfo] = useState([])
  const [selectedType, setSelectedType] = useState({ name: '', id: null })
  const [selectedBrand, setSelectedBrand] = useState({ name: '', id: null })
  const [name, setName] = useState('')
  const [cost, setCost] = useState('')
  const [file, setFile] = useState(null)

  const addFile = (e) => {
    setFile(e.target.files[0])
  }

  useEffect(() => {
    ;(async () => {
      const types = await fetchTypes()
      const brands = await fetchBrands()
      device.setTypes(types)
      device.setBrands(brands)
    })()
  }, [device])

  const addInfo = () => {
    setInfo([...info, { title: '', description: '', number: Date.now() }])
  }

  const removeInfo = (number) => {
    setInfo(info.filter((item) => item.number !== number))
  }

  const changeInfo = (key, value, number) => {
    setInfo(
      info.map((item) =>
        item.number === number ? { ...item, [key]: value } : item
      )
    )
  }

  const addDevice = () => {
    const formData = new FormData()
    //! Сервер приниманиет либо СТРОКУ, либо БЛОБ (хуй знает чё это)
    //! Поэтому если мы хотим передать массив, то надо превратить его в JSON
    formData.append('info', JSON.stringify(info))
    formData.append('name', name)
    formData.append('price', `${cost}`)
    formData.append('brandId', selectedBrand.id)
    formData.append('typeId', selectedType.id)
    formData.append('img', file)

    createDevice(formData).then((data) => onHide())
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Добавить новый Девайс
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className={'mt-2 mb-2'}>
            <Dropdown.Toggle>
              {selectedType.name || 'Выберите тип'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {device.types.map((type) => {
                return (
                  <Dropdown.Item
                    onClick={() =>
                      setSelectedType({ name: type.name, id: type.id })
                    }
                    key={type.id}>
                    {type.name}
                  </Dropdown.Item>
                )
              })}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className={'mt-2 mb-2'}>
            <Dropdown.Toggle>
              {selectedBrand.name || 'Выберите бренд'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {device.brands.map((brand) => {
                return (
                  <Dropdown.Item
                    onClick={() =>
                      setSelectedBrand({ name: brand.name, id: brand.id })
                    }
                    key={brand.id}>
                    {brand.name}
                  </Dropdown.Item>
                )
              })}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Введите название устройства'
            className={'mt-3 mb-2'}
          />
          <Form.Control
            value={cost}
            onChange={(e) => setCost(Number(e.target.value))}
            placeholder='Введите стоимость устройства'
            className={'mt-3 mb-2'}
            type='number'
          />
          <Form.Control
            onChange={addFile}
            className={'mt-3 mb-2'}
            type='file'
          />
        </Form>
        <hr />
        <Button variant='outline-dark' onClick={addInfo}>
          Добавить новое свойство
        </Button>
        {info.map((item) => {
          return (
            <Row key={item.number} className='mt-4'>
              <Col md='4'>
                <Form.Control
                  value={item.title}
                  onChange={(e) =>
                    changeInfo('title', e.target.value, item.number)
                  }
                  placeholder='Введите название'
                />
              </Col>
              <Col md='4'>
                <Form.Control
                  value={item.description}
                  onChange={(e) =>
                    changeInfo('description', e.target.value, item.number)
                  }
                  placeholder='Введите описание'
                />
              </Col>
              <Col md='4'>
                <Button
                  variant='outline-danger'
                  onClick={() => removeInfo(item.number)}>
                  Удалить
                </Button>
              </Col>
            </Row>
          )
        })}
      </Modal.Body>
      <Modal.Footer>
        <Button variant='outline-danger' onClick={onHide}>
          Закрыть
        </Button>
        <Button variant='outline-success' onClick={addDevice}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreateDevice
