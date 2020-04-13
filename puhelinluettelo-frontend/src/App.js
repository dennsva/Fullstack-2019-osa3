import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Axios from 'axios';

const baseUrl = 'http://localhost:3001/api/persons'

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
    Axios
      .get(baseUrl)
      .then(response => {
        setPersons(response.data)
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
