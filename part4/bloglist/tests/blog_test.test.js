const { test, after, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)

describe('exercise 4.8 step1 ', () => {
  test.only('notes are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

describe('exercise 4.9 step2', () => {
  test.only('unique identifier property of the blog posts is named id', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    response.body.forEach((blog) => {
      assert.notStrictEqual(blog.id, undefined)
      assert.StrictEqual(blog._id, undefined)
    })
  })
})

describe('exercise 4.10 step3', () => {
  test.only('HTTP POST successfully creates a new blog post', async () => { })
})

after(async () => {
  await mongoose.connection.close()
})
