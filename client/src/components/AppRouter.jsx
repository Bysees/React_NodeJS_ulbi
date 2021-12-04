import { Context } from '../index.js'
import React, { useContext } from 'react'
import { Route, Routes } from 'react-router'
import { authRoutes, publicRoutes } from '../routes.js'
import { observer } from 'mobx-react-lite'

const AppRouter = observer(() => {
  const { user } = useContext(Context)

  return (
    <Routes>
      {user.isAuth &&
        authRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      {publicRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  )
})

export default AppRouter
