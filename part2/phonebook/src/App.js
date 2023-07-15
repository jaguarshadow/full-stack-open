import { useEffect, useState } from 'react'
import pbService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    pbService.getAll()
      .then(initalPersons => {
        setPersons(initalPersons)
      })
    }, [])

  const peopleToShow = filter !== '' 
    ? persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
    : persons

  const addPerson = (event) => {
    event.preventDefault()
    var existing = persons.find(p => p.name == newName)
    if (existing != undefined) {
      var replace = window.confirm(`${newName} is already in the phonebook. Would you like to replace their number?`);
      if (!replace) return
      var replacedPerson = {...existing, number: newNumber}
      pbService.update(replacedPerson.id, replacedPerson)
        .then(test => {
          setPersons(persons.map(p => p.id != replacedPerson.id ? p : replacedPerson))
        })
    }
    else {
      const person = { name: newName, number: newNumber }
      pbService.create(person)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const removePerson = (person) => {
    if (!window.confirm(`Delete ${person.name}?`)) return;
    pbService.remove(person.id)
      .then(() => {
        setPersons(persons.filter(x => x.id != person.id))
      })
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
      <PersonList toShow={peopleToShow} deleteAction={removePerson} />
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

const PersonList = ({toShow, deleteAction}) => (
  <>
    {toShow.map(p => 
      <p key={p.id ?? p.name}>{p.name} {p.number} 
        <button onClick={() => deleteAction(p)}>
          delete
        </button>
      </p>)}
  </>
)

export default App