import { useState, useEffect } from "react";
import personService from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");
  const [showMessage, setShowMessage] = useState(null);

  const handlePersonAdd = (event) => {
    event.preventDefault();

    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to the phonebook, replace the old number with a new one?`,
      );

      if (confirmUpdate) {
        const changedPerson = { ...existingPerson, number: newNumber };

        personService
          .update(existingPerson.id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : returnedPerson,
              ),
            );
            setShowMessage(`updated ${newName}`);
            setNewName("");
            setNewNumber("");
            setTimeout(() => {
              setShowMessage(null);
            }, 2000);
          })
          .catch((error) => {
            setShowMessage(
              `Information of ${existingPerson.name} has already been removed from the server`,
            );

            setTimeout(() => {
              setShowMessage(null);
            }, 2000);

            setPersons(persons.filter((p) => p.id !== existingPerson.id));
          });
      }
      return;
    }
    const newPersonObject = {
      name: newName,
      number: newNumber,
    };

    personService.create(newPersonObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setShowMessage(`added ${newName}`);
      setNewName("");
      setNewNumber("");
      setTimeout(() => {
        setShowMessage(null);
      }, 2000);
    });
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterName = (event) => {
    setFilterName(event.target.value);
  };

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filterName.toLowerCase()),
  );

  const handlePersonDelete = (id, name) => {
    let confirmation = window.confirm(
      `do you want to remove this ${name} person`,
    );
    if (confirmation) {
      personService.deletePerson(id).then((returnedPerson) => {
        console.log(returnedPerson);
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
    return;
  };

  useEffect(() => {
    personService.getAll().then((personList) => setPersons(personList));
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={showMessage} />

      <Filter filterName={filterName} handleFilterName={handleFilterName} />

      <h2>Add a New</h2>

      <PersonForm
        onSubmit={handlePersonAdd}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>

      <Persons
        personsToShow={personsToShow}
        handleDeletion={handlePersonDelete}
      />
    </div>
  );
};

export default App;
