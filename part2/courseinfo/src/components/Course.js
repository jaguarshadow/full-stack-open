const Course = ({ course }) => {
    return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }

  const Header = ({course}) => {
    console.log(course)
    return (
      <h1>{course}</h1>
    )
  }
  
  const Content = ({ parts }) => {
    console.log(parts)
    return (
      <>
        {parts.map(part => <Part part={part} key={part.id} />)}
      </>
    )
  }
  
  const Part = ({ part }) => {
    console.log(part)
    return (
      <p>{part.name} {part.exercises}</p>
    )
  }
  
  const Total = ({ parts }) => {
    const total = parts.map(part => part.exercises).reduce((total, num) => total + num)
    return (
      <p><b>total of {total} exercises</b></p>
    )
  }

export default Course