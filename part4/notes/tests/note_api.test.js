const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const Note = require('../models/note')

const api = supertest(app)

// initial notes
const initialNotes = [
  { content: 'HTML is easy', important: false },
  { content: 'Browser can execute only JS', important: true },
]

// before every test this is done

beforeEach(async () => {
  await Note.deleteMany({})
  let noteObject = new Note(initialNotes[0])
  await noteObject.save()
  noteObject = new Note(initialNotes[1])
  await noteObject.save()
})

test.only('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

after(async () => {
  await mongoose.connection.close()
})

test.only('all notes are returned', async () => {
  const response = await api.get('/api/notes')
  assert.strictEqual(response.body.length, initialNotes.length)
})

test('a specific note is within the returned notes', async () => {
  const response = await api.get('/api/notes')
  console.log(response.body.length, 2)
  assert.strictEqual(response.body.length, 2)
})
