const express = require('express')
var morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

app.use(express.static('build'))

morgan.token('params', function(req, res) {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms  :params'))

const generateId = () => {
  const maxId = people.length > 0
    ? Math.max(...people.map(n => n.id))
    : 0
  return maxId + 1
}

let people = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
  response.send(`
  <p>Phonebook has info for ${people.length} people</p>
  <p>Request made ${new Date().toString()}</p>
  `)
})

app.get('/api/persons', (request, response) => {
    response.json(people)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = people.find(note => note.id === id)

  if (person) {
      response.json(person)
  } else {
      response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  people = people.filter(p => p.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  
  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'params "name" or "number" missing' 
    })
  }

  const filteredPeople = people.filter(person => person.name.toLowerCase() === body.name.toLowerCase())
  if (filteredPeople.length > 0) {
    return response.status(400).json({ 
      error: 'name already added to phonebook' 
    })
  }
  
  const person = {
      name: body.name,
      number: body.number,
      date: new Date(),
      id: generateId(),
  }
  
  people = people.concat(person)
  
  response.json(person)
  })

const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})