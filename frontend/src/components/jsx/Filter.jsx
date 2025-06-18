import './../css/Filter.css'

function Filter({ category, handleFilterClick }) {
  return (
    <button onClick={() => handleFilterClick(category)}>
      {category}
    </button>
  )
}

export default Filter