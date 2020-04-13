import Axios from 'axios'
const baseURL = '/api/persons'

const getAll = () => {
  const request = Axios.get(baseURL)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = Axios.post(baseURL, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = Axios.put(`${baseURL}/${id}`, newObject)
  return request.then(response => response.data)
}

const remove = id => {
  const request = Axios.delete(`${baseURL}/${id}`)
  return request.then(response => response.data)
}

export default { getAll, create, update, remove }