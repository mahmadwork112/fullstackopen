const { test, after, describe } = require('node:test')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)

describe('exercise 4.8 part1 ', () => {
  test.only('notes are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

after(async () => {
  await mongoose.connection.close()
})
