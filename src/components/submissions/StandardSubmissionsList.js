import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { deleteStudent, getStudents } from "../../managers/students"
import { getUserByToken } from "../../managers/tokens"
import { deleteSubmission, getSubmissions } from "../../managers/submissions"

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


    const deleteButton = (deadSubmission) => {
        const handleDelete = () => {
          const shouldDelete = window.confirm("Are you sure you want to delete this post?");
          if (shouldDelete) {
            deleteSubmission(deadSubmission).then(() => {
              setSubmissions((prevSubmissions) => prevSubmissions.filter((sub) => sub.id !== deadSubmission.id));
            });
          }
        };
    
        return (
          <button onClick={handleDelete}>
            Delete
          </button>
        );
      };

      const seeUngradedAssignments = (event) => {
        fetch(`http://localhost:8000/submissions?incomplete`, {
          headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
          }
        })
        .then((res) => res.json())
        .then((incompleteSubmissions) => setSubmissions(incompleteSubmissions));
      };

    return (
        <>
            <h2 className="submissions">Submissions</h2>
            <section>
                <button onClick={seeUngradedAssignments}>Ungraded</button>
                </section>
            <article className="words">
                {submissions.map((submission) => (
                    <section className="submissions" key={submission.id}>
                       {
                        !currentUser.is_staff || !submission.date_reviewed ?
                        <header>
                            Submissions:{" "}
                            <Link to={`/editstandardsubmission/${submission.id}`}>
                                Submission {submission.id}
                            </Link>{" "}
                        </header>
                        :
                      ""


}
                        <div>
                            {submission?.student?.full_name}
                        </div>
                        <div>Assignment: {submission?.assignment?.title}</div>
                        <div>Assignment Instructions: {submission?.assignment?.assignment_instructions}</div>

                        <div>
                            Response: {submission.submission}
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


                        {!currentUser?.is_staff && submission.date_reviewed === null && !submission.teacher? (

    <div>Your assignment hasn't yet been ruthlessly judged with extreme niceties that border on condescension. You know how we English people do.</div>
)                         : " "
                        }

                        { submission.date_reviewed === null && submission.teacher ? (

<div>Your assignment is currently being reviewed by {submission?.teacher?.full_name}.</div>
)                         : " "
                    

                        }
                        
                        <footer>{deleteButton(submission)}</footer>
                        <div>----------------------------------------</div>
                    </section>
                ))}
                <button onClick={() => navigate('/assignmentlist')}> Return to Assignments</button>
            </article>
        </>
    );

}
