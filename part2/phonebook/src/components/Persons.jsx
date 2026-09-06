const Persons = ({ personsToShow, handleDeletion }) => {
  return (
    <ul>
      {personsToShow.map((person) => (
        <li key={person.name} style={{ marginTop: 5, marginBottom: 5 }}>
          {person.name}: {person.number}
          <button
            style={{ marginLeft: 12, marginTop: 5 }}
            onClick={() => handleDeletion(person.id, person.name)}
          >
            delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Persons;
