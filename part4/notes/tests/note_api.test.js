const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const helper = require('../utils/test_helper.js')
const Note = require('../models/note')

const api = supertest(app)

// before every test this is done
beforeEach(async () => {
  await Note.deleteMany({})
  let noteObject = new Note(helper.initialNotes[0])
  await noteObject.save()
  noteObject = new Note(helper.initialNotes[1])
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

test('all notes are returned', async () => {
  const response = await api.get('/api/notes')
  assert.strictEqual(response.body.length, helper.initialNotes.length)
})

test('a specific note is within the returned notes', async () => {
  const response = await api.get('/api/notes')
  console.log(response.body.length, 2)
  assert.strictEqual(response.body.length, 2)
})

// testing whether async/await works or not
test('a valid note can be added ', async () => {
  // creating a new dummy note
  const newNote = {
    content: 'async/await simplifies making async calls',
    important: true,
  }

  // posting the note using the api
  await api
    .post('/api/notes')
    .send(newNote)
    .expect(201)
    .expect('Content/Type', /application\/json/)

  const notesAtEnd = await helper.notesInDb()
  assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1)
  const contents = notesAtEnd.map((n) => n.content)
  assert(contents.includes('async/await simplifies making async calls'))
})

// invalid note creation test
test('note without content is not allowed ', async () => {
  const newNote = {
    important: true,
  }

  await api.post('/api/notes').send(newNote).expect(400)

  const notesAtEnd = await helper.notesInDb()
  assert.strictEqual(notesAtEnd.length, helper.initialNotes.length)
})

// test for a specific id note fetching
test('a specific note can be viewed', async () => {
  const notesAtStart = await helper.notesInDb()
  const noteToView = notesAtStart[0]

  const resultNote = await api
    .get(`/api/notes/${noteToView.id}`)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  assert.deepStrictEqual(resultNote.body, noteToView)
})

// test for deleting a note
test('a note can be deleted', async () => {
  const notesAtStart = await helper.notesInDb()
  const noteToDelete = notesAtStart[0]

  await api.delete(`/api/notes/${noteToDelete}`).expect(204)

  const notesAtEnd = await helper.notesInDbL()
  const ids = notesAtEnd.map((n) => n.id)
  assert(!ids.includes(noteToDelete.id))
  assert.strictEqual(notesAtEnd.length, helper.initialNotes.length - 1)
})
