import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserByToken } from "../../managers/tokens";
import { getSubmissions } from "../../managers/submissions";
import { getAssignments } from "../../managers/assignments";
import "./SubmissionForm.css"; // Import your CSS file here for custom styling

export const TeacherEvaluateSubmission = () => {
    const { submissionId } = useParams();
    const [token, setTokenState] = useState(localStorage.getItem("auth_token"));
    const [currentUser, setCurrentUser] = useState();
    const [assignments, setAssignments] = useState([]);

 

    useEffect(() => {
        if (token) {
            getUserByToken(token).then((data) => setCurrentUser(data.user));
        }
    }, [token]);

    useEffect(() => {
        getAssignments().then((assignmentArray) => {
            setAssignments(assignmentArray);
        });
    }, []);



    const [editedSubmission, editSubmission] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8000/submissions/${submissionId}`, {
            headers: {
                Authorization: `Token ${localStorage.getItem("auth_token")}`,
            },
        })
            .then((res) => res.json())
            .then((submissionData) => {
                submissionData.assignment = submissionData?.assignment?.id;
                editSubmission(submissionData);
            })
            .catch((error) => {
                console.error("Error fetching word data:", error);
            });
    }, []);

    const changeSubmissionState = (domEvent) => {
        const updatedSubmission = { ...editedSubmission };
        updatedSubmission[domEvent.target.name] = domEvent.target.value;
        editSubmission(updatedSubmission);
    };

 

    return (
        <div className="container">
            <h2 className="title is-2">Submission Evaluation</h2>
            <form>
                <div className="field">
                    <label className="label is-size-4">Assignment</label>
                    <div className="control">
                        <div className="select">
                            <select
                                className="select is-medium-small"
                                name="assignment"
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
                    </div>
                </div>

                <div className="field">
                    <label className="label is-size-4">Submission</label>
                    <div className="control">
                        <textarea
                            type="text"
                            name="submission"
                            required
                            class="textarea input is-medium"
                            rows="7"
                            value={editedSubmission.submission}
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label is-size-4">Teacher Feedback</label>
                    <div className="control">
                        <textarea
                            type="text"
                            name="teacher_feedback"
                            required
                            class="textarea input is-medium"
                            rows="5"
                            placeholder="Ruin Some Hopes And Dreams"

                            value={editedSubmission.teacher_feedback}
                            onChange={changeSubmissionState}
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label is-size-4">Date Reviewed</label>
                    <div className="control">
                        <input
                            type="date"
                            name="date_reviewed"
                            required
                            className="input is-large"
                            value={editedSubmission.date_reviewed}
                            onChange={changeSubmissionState}
                        />
                    </div>
                </div>

                <div className="field">
                    <div className="control">
                        <button
                            className="button is-primary is-large ml-1 mt-1 mb-1 px-4 mr-1"
                            onClick={(evt) => {
                                evt.preventDefault();
                                const updatedSubmissionRequest = {
                                    teacher: currentUser.id,
                                    student: editedSubmission?.student?.id,
                                    submission: editedSubmission.submission,
                                    teacher_feedback: editedSubmission.teacher_feedback,
                                    date_reviewed: editedSubmission.date_reviewed,
                                    assignment: parseInt(editedSubmission?.assignment),
                                };

                                fetch(`http://localhost:8000/submissions/${editedSubmission.id}`, {
                                    method: "PUT",
                                    headers: {
                                        "Content-Type": "application/json",
                                        Authorization: `Token ${localStorage.getItem("auth_token")}`,
                                    },
                                    body: JSON.stringify(updatedSubmissionRequest),
                                })
                                    .then(() => navigate(`/standardsubmissionslist`))
                            }}
                        >


                            Save
                        </button>
                        <button className="button is-danger is-large ml-1 mt-1 mb-1 px-4 mr-1" onClick={() => navigate("/standardsubmissionslist")}>
                            Cancel
                        </button>
                    </div>
                </div>

                <div className="field">

                </div>
            </form>
        </div>
    );
};
