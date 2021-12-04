import { observer } from 'mobx-react-lite'
import { Fragment, useContext, useEffect, useState } from 'react'
import { Context } from '.'
import './App.css'
import AppRouter from './components/AppRouter'
import NavBar from './components/NavBar'
import { check } from './http/userApi'
import { Spinner } from 'react-bootstrap'

const App = observer(() => {
  const { user } = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      try {
        const data = await check()
        user.setUser(data)
        user.setAuth(true)
      } catch (e) {
        console.log(`Error: user is ${e.response.statusText}`)
      } finally {
        setLoading(false)
      }
    })()
  }, [user])

  if (loading) return <Spinner animation={'grow'} />

  return (
    <Fragment>
      <NavBar />
      <AppRouter />
    </Fragment>
  )
})

export default App
