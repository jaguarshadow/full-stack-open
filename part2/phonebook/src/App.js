import { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
    }, [])

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