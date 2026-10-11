require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONDODB_URI
    : process.env.MONDODB_URI

module.exports = { MONGODB_URI, PORT }
