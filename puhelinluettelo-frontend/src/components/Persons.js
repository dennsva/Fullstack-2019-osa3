import React from 'react'
import personService from '../services/persons'

const Persons = ({persons, setPersons, filter, notify}) => {
  const toShow = persons.filter(person => person.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0)
  console.log(`Found ${toShow.length} persons matching filter ${filter}`)
  return(
    <div>
      <h2>Numerot</h2>
      {toShow.map(person => 
        <p key={person.name}>
          {person.name} {person.number}
          <button onClick={() => {
            if (window.confirm(`Poistetaanko ${person.name}?`)) {
              personService
                .remove(person.id)
              setPersons(persons.filter(p => p.id !== person.id))
              console.log(`${person.name} removed`)
              notify({message: `Poistettiin ${person.name}`, type:'good'})
            }
          }}>
            poista
          </button>
        </p>
      )}
    </div>
  )
}

export default Persons