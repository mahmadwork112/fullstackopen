const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// TODO: convert these to async/await

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => response.json(blogs))
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  })

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
  // await will automatically catch errors aswell.
})

module.exports = blogsRouter
