import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    setTotal(total + 1)
    console.log(`good! ${good + 1}`)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setTotal(total + 1)
    console.log(`neutral! ${neutral + 1}`)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setTotal(total + 1)
    console.log(`bad! ${bad + 1}`)
  }

  return (
    <>
      <Feedback goodClick={handleGoodClick} neutralClick={handleNeutralClick} badClick={handleBadClick}/>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} />
    </>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Feedback = ({goodClick, neutralClick, badClick}) => {
  return (
    <div>
      <h1>give feedback</h1>
      <p>
        <Button handleClick={goodClick} text='good' />
        <Button text='neutral' handleClick={neutralClick}/>
        <Button text='bad' handleClick={badClick}/>
      </p>

    </div>
  )
}

const Statistics = ({good, neutral, bad, total}) => {
  if (total === 0) {
    return(
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return(
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticsLine text="good" value={good} />
          <StatisticsLine text="neutral" value={neutral} />
          <StatisticsLine text="bad" value={bad} />
          <StatisticsLine text="all" value={total} />
          <StatisticsLine text="average" value={good - bad} />
          <StatisticsLine text="positive" value={`${(good / total) * 100}%`} />
        </tbody>
      </table>
    </div>
  )
}

const StatisticsLine = ({text, value}) => {
  return (
    <tr>
      <td>{text} {value}</td>
    </tr>
  )
}

export default App