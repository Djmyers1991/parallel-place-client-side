import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAssignments } from "../../managers/assignments";
import { getUserByToken } from "../../managers/tokens";


export const StandardSubmissionForm = () => {

    const [formError, setFormError] = useState(false);
    const [token, setTokenState] = useState(localStorage.getItem('auth_token'))
    const [currentUser, setCurrentUser]= useState()
    const [assignments, setAssignments] = useState([])


    const [submission, createSubmission] = useState({
        teacher: 0,
        student: 0,
        assignment: 0,
        submission: "",
        teacher_feedback: "",
        date_reviewed: null


 
    });

        useEffect(() => {
        if (token) {
            getUserByToken(token).then(data => setCurrentUser(data.user))
        }
    }, [token])

    useEffect(() => {
        getAssignments().then((assignmentArray) => setAssignments(assignmentArray))

    }, [])



    const navigate = useNavigate();
console.log(currentUser)
    const handleSaveButtonClick = (event) => {
        event.preventDefault();
        if (!submission.submission || !submission.assignment) {
            setFormError(true);
            return;
        }
        const messageToSendToAPI = {
            teacher: null,
            student: currentUser.id,
            assignment: submission.assignment,
            submission: submission.submission,
            teacher_feedback: "",
            date_reviewed: null
        }
    
        fetch("http://localhost:8000/submissions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem("auth_token")}`
            },
            body: JSON.stringify(messageToSendToAPI)
        })
        .then(response => response.json())
        .then((data) => {
             
            // If tags were selected, create the post/tag relationships with the new post id
        
            navigate(`/standardsubmissionslist`);
        });
    }
        


    return (
        <form className="submissionForm column">
            <h2 className="submissionFormHeader submission is-2">Submission</h2>

            <fieldset>
                <div className="form-group">
                    <select value={submission.assignment.id} onChange={(evt) => {
                        const copy = { ...submission }
                        copy.assignment = parseInt(evt.target.value)
                        createSubmission(copy)
                    }}>
                        <option value="0">List of Assignments</option>
                        {
                            assignments.map(assignment => <option key={`assignment--${assignment.id}`} value={assignment.id}>{assignment.title}</option>)
                        }
                    </select>
                    {/* {
                            assignments.map(assignment => <div>{assignment.assignment_instructions}</div>)
                        } */}
                </div>

            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="submissionHTML" className="submission">Writing Exercise:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control input"
                        placeholder="THINK OF A FUN submission"
                        value={submission.submission}
                        onChange={(evt) => {
                            const copy = { ...submission };
                            copy.submission = evt.target.value;
                            createSubmission(copy);
                        }}
                    />
                </div>
            </fieldset>
         
           <button onClick={handleSaveButtonClick}> Submit submission </button>

          

            {formError && <div className="alert alert-danger">Please fill in all of the required fields. You will not be approved until you do so. We don't mess around here.</div>}
        </form>
    );
};
