import React, { Fragment, useState } from 'react'
import { Modal, Button, Form, Spinner, Badge } from 'react-bootstrap'
import { createType } from '../../http/deviceApi'

const CreateType = ({ show, onHide }) => {
  const [typeText, setTypeText] = useState('')
  const [panding, setPanding] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorText, setErrorText] = useState(false)

  const getTypeText = (e) => {
    setTypeText(e.target.value)
  }

  const closeModal = () => {
    onHide()
    setShowError(false)
    setTypeText('')
  }

  const addType = async () => {
    setPanding(true)
    try {
      await createType(typeText)
      onHide()
      setTypeText('')
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
          Добавить новый типа
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            value={typeText}
            onChange={getTypeText}
            placeholder='Введите название тип'></Form.Control>
        </Form>
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
      </Modal.Body>
      <Modal.Footer>
        <Button variant='outline-danger' onClick={closeModal}>
          Закрыть
        </Button>
        <Button disabled={panding} variant='outline-success' onClick={addType}>
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

export default CreateType
