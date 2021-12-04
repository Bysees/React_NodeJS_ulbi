const production = {
  DATABASE_URL: process.env.DATABASE_URL,
  options: {
    dialect: 'postgres', // СУБД которой мы пользуемся
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  production: process.env.NODE_ENV,
}

const pre_production = {
  DATABASE_URL: process.env.DATABASE_URL,
  options: {
    dialect: 'postgres',
  },
  pre_production: process.env.NODE_ENV,
}

const development = {
  DATABASE_URL: process.env.DATABASE_URL,
  options: {
    dialect: 'postgres',
  },
  development: process.env.NODE_ENV,
}

let result = development
if (process.env.NODE_ENV === 'production') result = production
if (process.env.NODE_ENV === 'pre_production') result = pre_production
if (process.env.NODE_ENV === 'development') result = development

exports.Config = result
