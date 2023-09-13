import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { deleteTeacher, getTeachers } from "../../managers/teachers"
import { getUserByToken } from "../../managers/tokens"

export const TeacherNameList = () => {

    const [teachers, setTeachers] = useState([])
    const navigate = useNavigate()
    const [token, setTokenState] = useState(localStorage.getItem('auth_token'))
    const [currentUser, setCurrentUser]= useState()



useEffect(() => {
  if (token) {
      getUserByToken(token).then(data => setCurrentUser(data.user))
  }
}, [token])

    useEffect(() => {
        getTeachers().then((teacher) => setTeachers(teacher))

}, [])

const deleteButton = (eliminateTeacher) => {
  const handleDelete = () => {
    const shouldDelete = window.confirm("Are you sure you want to delete this post?");
    if (shouldDelete) {
      deleteTeacher(eliminateTeacher).then(() => {
        setTeachers((currentTeachers) => currentTeachers.filter((teacher) => teacher.id !== eliminateTeacher.id));
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
      <h2 className="teacher profiles">Teacher List</h2>
      <article className="words">
  {teachers.map((teacher) => {

return (
    <section className="teacher" key={teacher.id}>
{
  currentUser?.is_staff && currentUser.id === teacher.id?
  <header>
    
  <Link to={`/editteachernamelist/${teacher.id}`}>{teacher.full_name}</Link> </header>
  : 
  <header>
    
  {teacher.full_name} </header>

    }


        
        <section> Teacher Information </section>
        <div>Email: {teacher?.user?.email}</div>
        <div>Bio: {teacher.bio}</div>
        <div>Favorite Book: {teacher.favorite_book}</div>
        <div>Representing Image <img src={teacher.representing_image} alt ="TeacherImage"/></div>



         { currentUser?.id === teacher?.user?.id ? (

        
        <footer>{deleteButton(teacher)}</footer>)
        :
(
            "" )
  }
        <div>----------------------------------------</div>
      </section>
    );
  })}
{/* <button onClick={ () => {navigate('/teacherform')}}> Create New teacher</button> */}
</article>
</>
)
}

