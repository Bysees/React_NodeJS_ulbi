import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Container, Nav, Navbar, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Context } from '..'
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts'
import styles from './NavBar.module.css'
import { useNavigate, useLocation } from 'react-router-dom'
import { authRoutes } from '../routes'

const NavBar = observer(() => {
  const { user } = useContext(Context)
  const navigation = useNavigate()
  const location = useLocation()
  const authPaths = authRoutes.map((route) => route.path)

  const logOut = () => {
    user.setAuth(false)
    user.setUser(false)
    if (authPaths.includes(location.pathname)) {
      navigation(SHOP_ROUTE)
    }
    localStorage.removeItem('token')
  }

  return (
    <Navbar bg='dark' variant='dark' className='p5'>
      <Container>
        <Link className={styles.brand} to={SHOP_ROUTE}>
          Купи-Дейвас
        </Link>
        {user.isAuth ? (
          <Nav className='ml-auto'>
            <Button
              variant='outline-light'
              onClick={() => navigation(ADMIN_ROUTE)}>
              Админ Панель
            </Button>
            <Button variant='outline-light' className='ms-3' onClick={logOut}>
              Выйти
            </Button>
          </Nav>
        ) : (
          <Nav className='ml-auto'>
            <Button
              variant='outline-light'
              onClick={() => navigation(LOGIN_ROUTE)}>
              Авторизация
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  )
})

export default NavBar
