import React from 'react'

const Filter = ({filter, setFilter}) => {
  const handleFilterChange = (event) => {
    const newFilter = event.target.value
    setFilter(newFilter)
    console.log(`Filter set to ${newFilter}`)
  }

  return (
    <form>
      <div>
        rajaa näytettäviä: 
        <input
          value={filter}
          onChange={handleFilterChange}
        />
      </div>
    </form>
  )
}

export default Filter