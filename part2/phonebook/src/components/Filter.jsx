const Filter = ({ filterName, handleFilterName }) => {
  return (
    <div>
      filter shown with{" "}
      <input
        placeholder="filter name..."
        value={filterName}
        onChange={handleFilterName}
      />
    </div>
  );
};

export default Filter;
