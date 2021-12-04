require('dotenv').config() //? Позволяет пользоваться файлом .env
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')
const { urlencoded } = require('express')
const config = require('./config').Config

const PORT = process.env.PORT || 5000

const app = express()

//? Позволяет отправлять запросы с браузера
app.use(cors())
//? Позволяет приложению парсить JSON формат
//? То есть без этой опции, мы всегда будем получать req.body пустым
app.use(express.json())
//? Позволяет просматривать картинки в папке static через URL
app.use(express.static(path.resolve(__dirname, 'static')))
//? Позволяет работать с файлами
app.use(fileUpload({}))
app.use(urlencoded({ extended: true }))
app.use('/api', router)
app.use(errorHandler) //! Всегда должен регистрироваться в самом конце

//!deploy
if (config.production || config.pre_production) {
  console.log('PRODUCTION STARTED')
  app.use(express.static(path.join(__dirname, '..', 'client', 'build')))
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'clien', 'build', 'index.html'))
  })
}
//!

const start = async () => {
  try {
    await sequelize.authenticate() //? Подкючение к базе данных
    await sequelize.sync() //? Сверяет состояние БД со схемой данных

    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  } catch (e) {
    console.log('Ошибка при запуске сервера : ', e)
  }
}

start()
