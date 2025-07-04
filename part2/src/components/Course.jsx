const Header = ({courseName}) => <h2>{courseName}</h2>

const Course = ({course})=>{
  return (
    <div>
      <h1>Web development curriculum</h1>
      <div>
            <Header courseName={course[0].name}/>
            <Content parts = {course[0].parts}/>
            <Total parts = {course[0].parts}/>
      </div>
      <div>
          <Header courseName={course[1].name}/>
          <Content parts = {course[1].parts}/>
          <Total parts = {course[1].parts}/>
      </div>
     
    </div>
  )
}

const Total = ({parts}) => {
  let total = parts.reduce(( sum,part)=>sum + part.exercises,0)

  return (
    <strong>total of {total} exercises</strong>
  )
}
const Part = ({part})=>{
  return (
        <div>
          <span>{part.name} </span>

          <span> {part.exercises}</span>
        </div>)
}

const Content = ({parts})=>{
  return (
    <div>
      {
      parts.map((part)=>
        <Part key={part.id} part={part}/>
      )}
    </div>
  )
}

export default Course;