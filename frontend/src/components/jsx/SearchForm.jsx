import './../css/SearchForm.css'

function SearchForm({ handleSearch, handleClear }) {

  // Handle user submission of search
  const handleSubmit = (event) => {
    event.preventDefault();
    const query = event.target[0].value;
    handleSearch(query);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input type="text" placeholder="Search" onChange={(e) => handleSearch(e.target.value)}/>
      <div id="search-helper-buttons">
        <button type="submit">Submit</button>
        <button type="reset" onClick={handleClear}>Clear</button>
      </div>
    </form>
  )
};

export default SearchForm