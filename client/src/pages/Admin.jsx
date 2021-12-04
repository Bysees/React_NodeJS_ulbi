import React, { useState } from 'react'
import { Container, Button, ButtonGroup } from 'react-bootstrap'
import CreateBrand from '../components/modals/CreateBrand'
import CreateDevice from '../components/modals/CreateDevice'
import CreateType from '../components/modals/CreateType'

const Admin = () => {
  const [brandVisible, setBrandVisible] = useState(false)
  const [typeVisible, setTypeVisible] = useState(false)
  const [deviceVisible, setDeviceVisible] = useState(false)

  return (
    <Container className='d-flex mt-3 justify-content-center'>
      <ButtonGroup vertical size='lg' style={{ width: 800 }}>
        <Button variant='outline-dark' onClick={() => setDeviceVisible(true)}>
          Добавить устройство
        </Button>
        <Button variant='outline-dark' onClick={() => setBrandVisible(true)}>
          Добавить бренд
        </Button>
        <Button variant='outline-dark' onClick={() => setTypeVisible(true)}>
          Добавить тип
        </Button>
      </ButtonGroup>
      <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
      <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
      <CreateDevice
        show={deviceVisible}
        onHide={() => setDeviceVisible(false)}
      />
    </Container>
  )
}

export default Admin
