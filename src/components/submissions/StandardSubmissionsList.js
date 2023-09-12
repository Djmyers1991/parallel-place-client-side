import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { deleteStudent, getStudents } from "../../managers/students"
import { getUserByToken } from "../../managers/tokens"
import { getSubmissions } from "../../managers/submissions"

export const StandardSubmissionList = () => {

    const [submissions, setSubmissions] = useState([])
    const navigate = useNavigate()
    const [token, setTokenState] = useState(localStorage.getItem('auth_token'))
    const [currentUser, setCurrentUser] = useState()



    useEffect(() => {
        if (token) {
            getUserByToken(token).then(data => setCurrentUser(data.user))
        }
    }, [token])

    useEffect(() => {
        getSubmissions().then((submission) => setSubmissions(submission))

    }, [])

    console.log(currentUser)

    // const deleteButton = (eliminateStudent) => {
    //   const handleDelete = () => {
    //     const shouldDelete = window.confirm("Are you sure you want to delete this post?");
    //     if (shouldDelete) {
    //       deleteStudent(eliminateStudent).then(() => {
    //         setStu((currentStudents) => currentStudents.filter((student) => student.id !== eliminateStudent.id));
    //       });
    //     }
    //   };

    //   return (
    //     <button onClick={handleDelete}>
    //       Delete
    //     </button>
    //   );
    // ;

    return (
        <>
            <h2 className="submissions">Submissions</h2>
            <article className="words">
                {submissions.map((submission) => (
                    <section className="submissions" key={submission.id}>
                        <header>
                            Submissions:{" "}
                            <Link to={`/editstudentprofile/${submission.id}`}>
                                Submission {submission.id}
                            </Link>{" "}
                        </header>
                        <div>
                            {submission?.student?.full_name}
                        </div>
                        <div>Assignment: {submission?.assignment?.title}</div>
                        <div>Assignment Instructions: {submission?.assignment?.assignment_instructions}</div>

                        <div>
                            Submission: {submission.submission}
                        </div>
                        { submission.date_reviewed !== null ? (


                     <>
                                <div> Feedback: {submission.teacher_feedback} </div>
                                <div> Date Reviewed: {submission.date_reviewed} </div>
                                <div> This essay has been reviewed by {submission?.teacher?.full_name} </div>
                            </>
                        ) : 
                        ""
}


                        {!currentUser?.is_staff && submission.date_reviewed === null ? (

    <div>Your assignment hasn't yet been ruthlessly judged with extreme niceties that border on condescension. You know how we English people do.</div>
)                         : " "
                        }
                        

                        <div>----------------------------------------</div>
                    </section>
                ))}
                <button onClick={() => navigate('/studentform')}> Create New Student</button>
            </article>
        </>
    );

}
