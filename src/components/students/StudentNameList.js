import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { deleteStudent, getStudents } from "../../managers/students"
import { getUserByToken } from "../../managers/tokens"

export const StudentNameList = () => {

    const [students, setStudents] = useState([])
    const navigate = useNavigate()
    const [token, setTokenState] = useState(localStorage.getItem('auth_token'))
    const [currentUser, setCurrentUser]= useState()



useEffect(() => {
  if (token) {
      getUserByToken(token).then(data => setCurrentUser(data.user))
  }
}, [token])

useEffect(() => {
  getStudents().then((student) => setStudents(student))

}, [])

console.log(currentUser)

const deleteButton = (eliminateStudent) => {
  const handleDelete = () => {
    const shouldDelete = window.confirm("Are you sure you want to delete this post?");
    if (shouldDelete) {
      deleteStudent(eliminateStudent).then(() => {
        setStudents((currentStudents) => currentStudents.filter((student) => student.id !== eliminateStudent.id));
      });
    }
  };

  return (
    <button onClick={handleDelete}>
      Delete
    </button>
  );
};


return (
    <>
      <h2 className="student profiles">Student List</h2>
      <article className="words">
  {students.map((student) => {

return (
    <section className="student" key={student.id}>

  <header>
  Student: <Link to={`/editstudentprofile/${student.id}`}>{student.full_name}</Link> </header>


        
        <section> Student Information </section>
        <div>Email: {student?.user?.email}</div>
        {currentUser?.is_staff ? (<>
        <div>Perceived IQ: {student.perceived_iq}</div>
        <div>Overall Potential or Lack thereof (Scale of 1-10): {student.overall_potential}</div>
        </>)
        : 
        ""
  }
  {currentUser?.is_staff || currentUser?.id === student.id ?
        <footer> Delete {deleteButton(student)} </footer>
        :
        ""
  }

        <div>----------------------------------------</div>
      </section>
    );
  })}
<button onClick={ () => {navigate('/studentform')}}> Create New Student</button>
</article>
</>
)
};


