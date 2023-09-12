import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {   } from "../../managers/students"
import { getUserByToken } from "../../managers/tokens"
import { getAssignments } from "../../managers/assignments";

export const AssignmentList = () => {

    const [assignments, setAssignments] = useState([])
    const navigate = useNavigate()
    const [token, setTokenState] = useState(localStorage.getItem('auth_token'))
    const [currentUser, setCurrentUser]= useState()


useEffect(() => {
  if (token) {
      getUserByToken(token).then(data => setCurrentUser(data.user))
  }
}, [token])

useEffect(() => {
  getAssignments().then((assignmentArray) => setAssignments(assignmentArray))

}, [])


return (
    <>
      <h2 className="Assignments">Assignments</h2>
      <article className="words">
  {assignments.map((assignment) => {

return (
    <section className="assignment" key={assignment.id}> 

  <header>
   <Link to={`/standardassignmentform`}> Assignment {assignment.id}: {assignment.title} </Link> </header>
  <div> Instructions: {assignment.assignment_instructions}</div>

        <div>----------------------------------------</div>
      </section>
    );
  })}
<button onClick={ () => {navigate('/studentform')}}> Create New Student</button>
</article>
</>
)
};


