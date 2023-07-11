import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  
  const peopleToShow = filter !== '' 
    ? persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
    : persons

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.map(p => p.name).includes(newName)) {
      alert(`${newName} is already added to the phonebook`);
      return
    }
    const person = { name: newName, number: newNumber }
    var updated = persons.concat(person)
    setPersons(updated)
    setNewName('')
    setNewNumber('')
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} filterHandler={(event) => setFilter(event.target.value)}/>
      <h2>add a new</h2>
      <AddPersonForm 
        onSubmit={addPerson} 
        name={newName} 
        number={newNumber} 
        nameChange={(event) => setNewName(event.target.value)}
        numberChange={(event) => setNewNumber(event.target.value)}
      />
      <h2>Numbers</h2>
      <PersonList toShow={peopleToShow} />
    </div>
  )
}

const AddPersonForm = ({onSubmit, name, number, nameChange, numberChange}) => (
    <form onSubmit={onSubmit}>
      <div>name: <input value={name} onChange={nameChange}/></div>
      <div>number: <input value={number} onChange={numberChange}/></div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  )

const Filter = ({filter, filterHandler}) => {
  return(
    <p>filter shown with <input value={filter} onChange={filterHandler}/></p>
  )
}

const PersonList = ({toShow}) => (
  <>
    {toShow.map(p => <p key={p.id ?? p.name}>{p.name} {p.number}</p>)}
  </>
)

export default App