import { useEffect, useState } from 'react'
import pbService from './services/persons'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [successLabel, setSuccessLabel] = useState(null)
  const [errorLabel, setErrorLabel] = useState(null)

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
        .then(() => {
          setSuccessLabel(`Updated ${replacedPerson.name}`)
          setTimeout(() => setSuccessLabel(null), 5000)
          setPersons(persons.map(p => p.id != replacedPerson.id ? p : replacedPerson))
        })
    }
    else {
      const person = { name: newName, number: newNumber }
      pbService.create(person)
        .then(newPerson => {
          setSuccessLabel(`Added ${newPerson.name}`)
          setTimeout(() => setSuccessLabel(null), 5000)
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
      .catch(() => {
        setErrorLabel(`${person.name} already removed from server`)
        setTimeout(() => setErrorLabel(null), 5000)
        setPersons(persons.filter(p => p.id !== person.id))
      })
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorLabel} style='notif error'/>
      <Notification message={successLabel} style='notif success'/>
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

const Notification = ({message, style}) => {
  if (message === null) return null
  return (
    <div className={style}>
      {message}
    </div>
  )
}

export default App