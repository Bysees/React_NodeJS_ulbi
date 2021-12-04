import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import { Card, Container, Form, Button, Row, Col } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Context } from '..'
import { login, registration } from '../http/userApi'
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts'

const Auth = observer(() => {
  const { user } = useContext(Context)
  const location = useLocation()
  const navigate = useNavigate()
  const isLogin = location.pathname === LOGIN_ROUTE

  const [userData, setUserData] = useState({
    email: '',
    password: '',
  })

  const click = async () => {
    try {
      let data
      if (isLogin) {
        data = await login(userData.email, userData.password)
      } else {
        data = await registration(userData.email, userData.password)
      }
      user.setUser(data)
      user.setAuth(true)
      navigate(SHOP_ROUTE)
    } catch (err) {
      alert(err.response.data.message)
    }
  }

  return (
    <Container
      className='d-flex justify-content-center align-items-center'
      style={{ height: window.innerHeight - 56 }}>
      <Card style={{ width: 600 }} className='p-5'>
        <h2 className='m-auto'>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
        <Form className='d-flex flex-column mt-4'>
          <Form.Control
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            placeholder='Введите ваш email...'
          />
          <Form.Control
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
            placeholder='Введите ваш пароль...'
            type='password'
            className='mt-4'
          />
          <Row className='d-flex justify-content-between mt-3'>
            {isLogin ? (
              <Col>
                Нет аккаунта?{' '}
                <Link to={REGISTRATION_ROUTE}>Зарегистрируйся!</Link>
              </Col>
            ) : (
              <Col>
                Есть аккаунт? <Link to={LOGIN_ROUTE}>Войдите</Link>
              </Col>
            )}
            <Col className='d-flex justify-content-end'>
              <Button
                onClick={click}
                variant='outline-primary'
                style={{ fontWeight: 600 }}>
                {isLogin ? 'Войти' : 'Зарегистрироваться'}
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </Container>
  )
})

export default Auth
