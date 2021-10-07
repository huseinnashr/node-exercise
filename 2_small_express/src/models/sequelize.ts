import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as unknown as number,
  dialect: 'mysql',
  timezone: '+07:00',
  logging: false,
  pool: {
    max: 50,
    min: 0,
    idle: 150000,
    acquire: 200000,
  }
})