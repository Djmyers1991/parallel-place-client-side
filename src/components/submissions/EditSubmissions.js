import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserByToken } from "../../managers/tokens"
import { getSubmissions } from "../../managers/submissions"
import { getAssignments } from "../../managers/assignments";

export const TeacherEvaluateSubmission = () => {
    const { submissionId } = useParams();
    const [token, setTokenState] = useState(localStorage.getItem('auth_token'))
    const [currentUser, setCurrentUser] = useState()
    const [assignments, setAssignments] = useState([])
    const [submissions, setSubmission] = useState([])

   
    useEffect(() => {
        if (token) {
            getUserByToken(token).then(data => setCurrentUser(data.user))
        }
    }, [token])
    
        console.log(currentUser)

    useEffect(() => {
        getAssignments().then((assignmentArray)=> {
            setAssignments(assignmentArray)
        })
    }, [])

    const [editedSubmission, editSubmission] = useState({
    

    });
    const navigate = useNavigate();
   
    useEffect(() => {
        fetch(`http://localhost:8000/submissions/${submissionId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("auth_token")}`
            }
        })
        .then(res => res.json())
        .then((submissionData) => {
            submissionData.assignment = submissionData?.assignment?.id
            editSubmission(submissionData)
        })
        .catch((error) => {
            // Handle any errors here, e.g., show an error message or redirect
            console.error("Error fetching word data:", error);
        });
    }, []);
    

  
    const changeSubmissionState = (domEvent) => {
        // Update the specific field in the newPost state
        const updatedSubmission = { ...editedSubmission };
        updatedSubmission[domEvent.target.name] = domEvent.target.value;
        editSubmission(updatedSubmission);
    }
    return (
        <form className="submission column">
            <h2 className="submissionFormHeader title">Submission Evaluation</h2>
            <header>
                <div>Student: {editedSubmission?.student?.full_name}</div>
                <div>Submission: {editedSubmission.submission}</div>            
                </header>
                <fieldset>
                <div className="form-group">
                    <label htmlFor="assignment" className="submissionFormHeader">Assignment:</label>
                    <select
                        className="select"
                        name = "assignment"
                        value={editedSubmission.assignment}
                        onChange={changeSubmissionState}
                     
                    >
                        <option value="0">Correct Assignments</option>
                        {assignments.map((assignment) => (
                            <option
                                key={`assignment--${assignment.id}`}
                                value={assignment.id}
                            >
                                {assignment.title}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            
            <fieldset>
                <div className="form-group">
                    <label htmlFor="teacher_feedback" className="subtitle">Teacher Feedback: </label>
                    <input type="text" name="teacher_feedback" required className="form-control input"
                        value={editedSubmission.teacher_feedback}
                        onChange={changeSubmissionState}
                    />
                </div>
            </fieldset>
             <fieldset>
                <div className="form-group">
                    <label htmlFor="date_reviewed" className="subtitle">Teacher Feedback: </label>
                    <input type="date" name="date_reviewed" required className="form-control input"
                        value={editedSubmission.date_reviewed}
                        onChange={changeSubmissionState}
                    />
                </div>
            </fieldset>
            <button
                type="submit"
                onClick={evt => {
                    evt.preventDefault(); // Prevent form submission
                    const updatedSubmissionRequest = {
                        teacher: currentUser.id,
                        student: editedSubmission?.student?.id,
                        submission: editedSubmission.submission,
                        teacher_feedback: editedSubmission.teacher_feedback,
                        date_reviewed: editedSubmission.date_reviewed,
                        assignment: parseInt(editedSubmission.assignment)


                    };
                    // Send the updated comment data to the server
                    fetch(`http://localhost:8000/submissions/${editedSubmission.id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Token ${localStorage.getItem("auth_token")}`
                        },
                        body: JSON.stringify(updatedSubmissionRequest)
                    })
                        .then(() => navigate(`/standardsubmissionslist`)); // Navigate after successful update
                }}
                className="btn btn-primary"
            >
                Save
            </button>
            <button > Cancel </button> 
        </form>
    );
};
