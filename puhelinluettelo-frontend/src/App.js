import React, { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

  const notify = (notn) => {
    setNotification(
      {
      message: notn.message,
      type: notn.type
      }
    )
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  useEffect(() => {
    console.log('Updating persons...')
    personService
      .getAll()
      .then(persons => {
        setPersons(persons)
        console.log(`Loaded ${persons.length} persons`)
      })
  }, [])

  return (
    <div>
      <h1>Puhelinluettelo</h1>
      <Notification notification={notification}/>
      <Filter filter={filter} setFilter={setFilter}/>
      <PersonForm persons={persons} setPersons={setPersons} notify={notify}/>
      <Persons persons={persons} setPersons={setPersons} filter={filter} notify={notify}/>
    </div>
  )
}

const Notification = ({notification}) => {
  if (notification === null) return null
  console.log(`Showing notification '${notification.message}' of type '${notification.type}'`)
  const color = notification.type === 'good'
    ? 'green'
    : 'red'
  return (
    <div className='error' style={{color}}>
      {notification.message}
    </div>
  ) 
}

export default App
