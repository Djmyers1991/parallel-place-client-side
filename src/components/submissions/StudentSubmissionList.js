import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserByToken } from "../../managers/tokens";
import { deleteSubmission, getSubmissionsByStudent } from "../../managers/submissions";
import "./Submissions.css";

export const StudentSubmissionList = () => {
    const [submissions, setSubmissions] = useState([]);
    const navigate = useNavigate();
    const [token, setTokenState] = useState(localStorage.getItem('auth_token'));
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        if (token) {
            getUserByToken(token).then(data => setCurrentUser(data.user));
        }
    }, [token]);

    useEffect(() => {
        getSubmissionsByStudent().then((submission) => setSubmissions(submission));
    }, []);

    const seeGradedAssignments = (event) => {
        fetch(`http://localhost:8000/submissions?completedstudent`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("auth_token")}`
            }
        })
            .then((res) => res.json())
            .then((incompleteSubmissions) => setSubmissions(incompleteSubmissions));
    };

    const seeUnGradedAssignments = (event) => {
        fetch(`http://localhost:8000/submissions?unreviewedstudent`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("auth_token")}`
            }
        })
            .then((res) => res.json())
            .then((incompleteSubmissions) => setSubmissions(incompleteSubmissions));
    };

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
            <button className="button is-danger ml-1 mt-1 mb-1 px-4 mr-1" onClick={handleDelete}>
                Delete
            </button>
        );
    };

    return (
        <>
            <h2 className="title is-2">Submissions</h2>
            <div className="buttons is-centered">
                <button class="button is-success " onClick={seeGradedAssignments}> Reviewed Submissions </button>
                <button class="button is-success " onClick={seeUnGradedAssignments}> Unreviewed Submissions </button>
            </div>

            <div className="submission-container">
                {submissions.map((submission) => (
                    <div
                        className={`submission-card card ${submission.date_reviewed !== null ? "has-green-border" : (submission.teacher !== null ? "currently-reviewing" : "has-red-border")}`}
                        key={submission.id}
                    >
                        <div className="card-content times-new-roman-font">
                            {
                                !currentUser?.is_staff && !submission?.date_reviewed ? (
                                    <header className="subtitle title is-3">
                                        <Link to={`/editstandardsubmission/${submission.id}`}>
                                            Submission {submission.id}
                                        </Link>{" "}
                                    </header>
                                ) : (
                                    <header className="subtitle title is-3">Submission {submission.id}</header>
                                )
                            }
                            <div className="box darker-border">
                                {submission?.student?.full_name}
                            </div>
                            <div className="box darker-border">
                                {submission?.assignment?.title} Assignment Instructions: <br></br> {submission?.assignment?.assignment_instructions}
                            </div>
                            <div className="box darker-border">
                                Submission: <br></br> {submission.submission}
                            </div>
                            {submission.date_reviewed !== null ? (
                                <>
                                    <div className="box darker-border">
                                        Feedback: <br></br> {submission.teacher_feedback}
                                    </div>
                                    <div className="box darker-border">
                                        Submission Review Complete: <br></br>
                                        This essay was reviewed by {submission?.teacher?.full_name} on {submission.date_reviewed}.
                                    </div>
                                </>
                            ) : null}
                            {!currentUser?.is_staff && submission.date_reviewed === null ? (
                                <div className="box darker-border">
                                    
                                    Review: In-Progress<br></br>
                                    Your assignment hasn't yet been ruthlessly judged with extreme niceties that border on condescension. You know how we English people do.
                                </div>
                            ) : null}
                        </div>
                        <footer className="card-footer">
                            <a className="card-footer-item" onClick={() => navigate('/assignmentlist')}>Return to Assignments</a>
                            {deleteButton(submission)}
                        </footer>
                    </div>
                ))}
            </div>
        </>
    );
};
