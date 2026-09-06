import { useState } from "react";
import { Button, Form, Toast, ToastContainer } from "react-bootstrap";

// --- MODULAR COMPONENTS ---

const Toast_Message = ({ show, onClose, message }) => {
  return (
    <ToastContainer
      position="top-end"
      className="p-3"
      style={{ position: "fixed" }}
    >
      <Toast onClose={onClose} show={show} delay={3000} autohide bg="warning">
        <Toast.Header>
          <strong className="me-auto">Warning</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

const Filter = ({ searchFilter, handleSearchChange }) => {
  return (
    <Form.Group className="mb-4" style={{ maxWidth: "300px" }}>
      <Form.Label>filter shown with:</Form.Label>
      <Form.Control value={searchFilter} onChange={handleSearchChange} />
    </Form.Group>
  );
};

const PersonForm = ({
  onSubmit,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => {
  return (
    <Form onSubmit={onSubmit} className="mb-4">
      <Form.Group className="mb-3" style={{ maxWidth: "300px" }}>
        <Form.Label>Name:</Form.Label>
        <Form.Control
          value={newName}
          onChange={handleNameChange}
          className="mb-2"
        />
        <Form.Label>Number:</Form.Label>
        <Form.Control value={newNumber} onChange={handleNumberChange} />
      </Form.Group>
      <Button type="submit" variant="primary">
        add
      </Button>
    </Form>
  );
};

const Person = ({ person }) => {
  return (
    <li>
      {person.name} {person.number}
    </li>
  );
};

const Persons = ({ persons }) => {
  return (
    <ul>
      {persons.map((person) => (
        <Person key={person.name} person={person} />
      ))}
    </ul>
  );
};

// --- MAIN APP COMPONENT ---

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  // State for form inputs
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  // State for the filter
  const [searchFilter, setSearchFilter] = useState("");

  // State for toast notifications
  const [showToast, setShowToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Event Handlers
  const handleNameChange = (event) => {
    setNewName(event.target.value);
    if (showToast) setShowToast(false);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
    if (showToast) setShowToast(false);
  };

  const handleSearchChange = (event) => {
    setSearchFilter(event.target.value);
  };

  const handleSubmitClick = (event) => {
    event.preventDefault();

    if (newName === "" || newNumber === "") {
      setErrorMessage("Name and number cannot be empty!");
      setShowToast(true);
      return;
    }

    const nameExists = persons.some((person) => person.name === newName);

    if (nameExists) {
      setErrorMessage(`${newName} is already added to phonebook!`);
      setShowToast(true);
      return;
    }

    const newPersonObject = { name: newName, number: newNumber };
    setPersons([...persons, newPersonObject]);

    setNewName("");
    setNewNumber("");
  };

  // Filter logic: determines which persons to show before passing them to the <Persons /> component
  const personsToShow =
    searchFilter === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(searchFilter.toLowerCase()),
        );

  return (
    <div className="container mt-4">
      <h2>Phonebook</h2>

      <Filter
        searchFilter={searchFilter}
        handleSearchChange={handleSearchChange}
      />

      <h3>Add a new</h3>

      <PersonForm
        onSubmit={handleSubmitClick}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      {/* Notice we pass personsToShow, not the full persons array */}
      <Persons persons={personsToShow} />

      <Toast_Message
        show={showToast}
        onClose={() => setShowToast(false)}
        message={errorMessage}
      />
    </div>
  );
};

export default App;
