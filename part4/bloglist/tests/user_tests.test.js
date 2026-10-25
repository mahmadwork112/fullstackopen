const assert = require('node:assert')
const { test, describe, after } = require('node:test')

const mongoose = require('mongoose')
const supertest = require('supertest')

const helper = require('../utils/list_helper')
const app = require('../app')
const api = supertest(app)

describe('exercise 4.16', () => {
  test.only('ensure invalid users are not created', async () => {
    const usersAtStart = await helper.usersInDb()
    // dummy user with invalid data
    const newUser = {
      username: 'di',
      name: 'Maheen',
      password: 'Ma',
    }

    // posting it
    const response = await api.post('/api/users').send(newUser).expect(400)
    assert(response.body.error)
    const usersAtEnd = await helper.usersInDb()

    // checking with assert that it doesnt get posted.
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})
