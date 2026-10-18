const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)

// initial blogs
const initialBlogs = [
  { title: 'HTML is easy', author: 'Ahmad', url: 'something1.com', likes: 150 },
  { title: 'CSS is fun', author: 'Sara', url: 'something2.com', likes: 25 },
  {
    title: 'JavaScript basics',
    author: 'Ali',
    url: 'something3.com',
    likes: 88,
  },
  {
    title: 'Node.js intro',
    author: 'Zainab',
    url: 'something4.com',
    likes: 12,
  },
  {
    title: 'Full Stack Open journey',
    author: 'Hamza',
    url: 'something5.com',
    likes: 200,
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
  console.log('done initializing the test database')

  // const blogObjects = initialBlogs.map((blog) => new Blog(blog))
  // const promiseArray = blogObjects.map((blog) => blog.save())
  // await Promise.all(promiseArray)
  // console.log('done')
})

describe('exercise 4.8 step1 ', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

describe('exercise 4.9 step2', () => {
  test('unique identifier property of the blog posts is named id', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    response.body.forEach((blog) => {
      assert.notStrictEqual(blog.id, undefined) // the task
      assert.StrictEqual(blog._id, undefined) // extra check
    })
  })
})

describe('exercise 4.10 step3', () => {
  test.only('HTTP POST successfully creates a new blog post', async () => {
    // dummy blog
    const newBlog = {
      title: 'test blog',
      author: 'testUser',
      url: 'test_url',
      likes: 150,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await api.get('/api/blogs')
    assert.strictEqual(blogs.body.length, initialBlogs.length + 1)
    const titles = blogs.body.map((blog) => blog.title)
    assert(titles.includes('test blog'))

    // const blogs = await api.get('/api/blogs')
    // const titles = blogs.body.map((blog) => blog.title)
    // assert(titles.includes('test blog'))
  })
})

after(async () => {
  await mongoose.connection.close()
})
