const express = require('express')
const morgan = require('morgan')
const app = express()

morgan.token('body', (req, res) => JSON.stringify(req.body))

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
    {
        name: "Essi Esimerkki",
        number: "040-8394726",
        id: 1
    },
    {
        name: "Mikko Mallihenkilö",
        number: "050-3957281",
        id: 2
    },
    {
        name: "Dennis Demonstraatio",
        number: "040-3893017",
        id: 3
    }
]

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
  res.send(`<p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
  `)
})


app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(note => note.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const generateId = () => {
    return Math.floor(1000000 * Math.random())
}
  
app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).json({ 
            error: 'name missing'
        })
    }

    if (!body.number) {
        return response.status(400).json({ 
            error: 'number missing'
        })
    }

    if (persons.map(person => person.name).includes(body.name)) {
        return response.status(400).json({ 
            error: `${body.name} is already on the list`
        })
    }

    const note = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    persons = persons.concat(note)

    response.json(note)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})