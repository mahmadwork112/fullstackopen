import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Note from "./Components/note"; // Make sure your Note.jsx just returns an <li>

const App = (props) => {
  const [notes, setNotes] = useState(props.notes || []);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: String(notes.length + 1),
    };

    setNotes(notes.concat(noteObject));
    setNewNote("");
  };

  const handleNoteChange = () => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  return (
    // container adds nice margins, mt-4 adds margin-top
    <div className="container mt-4">
      <h1 className="mb-4">Notes</h1>
      <div>
        <Button variant="primary" onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </Button>
      </div>
      <ul>
        {notes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>

      <Form onSubmit={addNote}>
        <Form.Control
          type="text"
          placeholder="Add a new note..."
          value={newNote}
          onChange={handleNoteChange}
        />
        <Button variant="primary" type="submit">
          save
        </Button>
      </Form>
    </div>
  );
};

export default App;
