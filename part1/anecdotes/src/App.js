import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const handleNext = () => setSelected(getRandomInt(anecdotes.length))
  
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const handleVote = (selected) => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }
  
  const getRandomInt = (max) => {
    let result = Math.floor(Math.random() * max)
    //console.log(result)
    return result
  }

  return (
    <>
      <DailyAnecdote anecdote={anecdotes[selected]} votes={votes[selected]} handleVote={() => handleVote(selected)} handleNext={handleNext}/>
      <WinningAnecdote anecdotes={anecdotes} votes={votes}/>
    </>
  )
}

const DailyAnecdote = ({anecdote, votes, handleVote, handleNext}) => {
  return(
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
      <Button handleClick={handleVote} text="vote" />
      <Button handleClick={handleNext} text="next anecdote" />
    </div>
  )
}

const WinningAnecdote = ({anecdotes, votes}) => {
  let max = Math.max(...votes)
  let index = votes.indexOf(max)
  return(
    <div>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[index]}</p>
      <p>has {max} votes</p>
    </div>
  )
}

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

export default App