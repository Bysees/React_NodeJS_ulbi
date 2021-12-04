import React, { Fragment, useState } from 'react'
import { Modal, Button, Form, Spinner, Badge } from 'react-bootstrap'
import { createBrand } from '../../http/deviceApi'

const CreateBrand = ({ show, onHide }) => {
  const [brandText, setBrandText] = useState('')
  const [panding, setPanding] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorText, setErrorText] = useState(false)

  const getBrandText = (e) => {
    setBrandText(e.target.value)
  }

  const closeModal = () => {
    onHide()
    setShowError(false)
    setBrandText('')
  }

  const addBrand = async () => {
    setPanding(true)
    try {
      await createBrand(brandText)
      onHide()
      setBrandText('')
      setShowError(false)
    } catch (e) {
      if (e.response.status === 405) {
        setShowError(true)
        setErrorText(e.response.data.message)
      }
    } finally {
      setPanding(false)
    }
  }

  return (
    <Modal
      show={show}
      onHide={closeModal}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Добавить новый бренд
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            value={brandText}
            onChange={getBrandText}
            placeholder='Введите название бренда'></Form.Control>
          {showError && (
            <div style={{ textAlign: 'center' }}>
              <Badge
                style={{ textAlign: 'center', fontSize: 16 }}
                className={'mt-2'}
                bg='danger'>
                {errorText}
              </Badge>
            </div>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='outline-danger' onClick={closeModal}>
          Закрыть
        </Button>
        <Button disabled={panding} variant='outline-success' onClick={addBrand}>
          {panding ? (
            <Fragment>
              <Spinner
                as='span'
                animation='grow'
                size='sm'
                role='status'
                aria-hidden='true'
              />
              Loading...
            </Fragment>
          ) : (
            <Fragment>Добавить</Fragment>
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreateBrand
