const { Sequelize } = require('sequelize')
const config = require('./config').Config

module.exports = new Sequelize(config.DATABASE_URL, config.options)

//? for dev
// module.exports = new Sequelize(process.env.DATABASE_URL, {
//   dialect: 'postgres', // СУБД которой мы пользуемся
// })

// !for prod
// module.exports = new Sequelize(process.env.DATABASE_URL, {
//   dialect: 'postgres', // СУБД которой мы пользуемся
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false,
//     },
//   },
// })

// module.exports = new Sequelize(
//   process.env.DB_NAME, // название бд
//   process.env.DB_USER, // пользователь
//   process.env.DB_PASSWORD, // пароль
//   {
//     dialect: 'postgres', // СУБД которой мы пользуемся
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//   }
// )
