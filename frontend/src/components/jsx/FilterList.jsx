import Filter from "./Filter"

function FilterList({ filters, handleFilterClick }) {
  return (
    <div className='filters'>
      {
        filters.map(filter => {
          return <Filter key={filter} category={filter} handleFilterClick={handleFilterClick}/>
        })
      }
    </div>
  )
}

export default FilterList