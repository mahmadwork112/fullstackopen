const Course = ({ course }) => {
  const name = course.name;
  const parts = course.parts;
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <div>
      <h1>{name}</h1>
      {parts.map((part) => (
        <li key={part.id}>
          {part.name} {part.exercises}
        </li>
      ))}
      <p style={{ fontWeight: "bold" }}>Total of {total} exercises</p>
    </div>
  );
};

export default Course;
