import React, { useState } from 'react'
import personService from '../services/persons'

const PersonForm = ({persons, setPersons, notify}) => {
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber
    }

    if (persons.map(person => person.name).includes(newName)) {
      if (window.confirm(`${newName} on jo luettelossa, korvataanko vanha numero uudella?`)) {
        const id = persons.filter(person => person.name === newName).map(person => person.id)[0]
        console.log(`Updating person with id ${id}`)
        personService
          .update(id, newPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id === id ? returnedPerson : person))
            setNewName('')
            setNewNumber('')
            console.log(`Changed number of ${returnedPerson.name} (id ${returnedPerson.id}) to ${returnedPerson.number}`)
            notify({message: `Henkilön ${returnedPerson.name} numero on nyt ${returnedPerson.number}`, type: 'good'})
          })
          .catch(error => {
            console.log(`Cannot update, person "${newPerson.name}" does not exist`)
            notify({message: `Henkilöä ${newPerson.name} ei ole puhelinluettelossa`, type: 'bad'})
            setPersons(persons.filter(p => p.id !== id))
          })
      }
      return
    }
    
    personService
      .create(newPerson)
      .then(createdPerson => {
        setPersons(persons.concat(createdPerson))
        setNewName('')
        setNewNumber('')
        console.log(`Created person ${createdPerson.name} (id ${createdPerson.id})`)
        notify({message: `Lisättiin ${createdPerson.name}`, type: 'good'})
      })
      .catch(error => {
        console.log(`Failed to add person ${newPerson.name}: ${error.response.data.error}`)
        notify({ message: error.response.data.error, type: 'bad' })
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return(
    <div>
    <h2>Lisää uusi</h2>
    <form onSubmit={addPerson}>
      <div>
        nimi: 
        <input
          value={newName}
          onChange={handleNameChange}
        />
      </div>
      <div>
        numero: 
        <input
          value={newNumber}
          onChange={handleNumberChange}
        />
      </div>
      <div>
        <button type="submit">lisää</button>
      </div>
    </form>
    </div>
  )
}

export default PersonForm