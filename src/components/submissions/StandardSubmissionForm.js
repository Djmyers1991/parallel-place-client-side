import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAssignments } from "../../managers/assignments";
import { getUserByToken } from "../../managers/tokens";
import "./SubmissionForm.css"; // Import your CSS file here for custom styling


export const StandardSubmissionForm = () => {
  const [formError, setFormError] = useState(false);
  const [token, setTokenState] = useState(localStorage.getItem("auth_token"));
  const [currentUser, setCurrentUser] = useState();
  const [assignments, setAssignments] = useState([]);
  const [submission, createSubmission] = useState({
    teacher: 0,
    student: 0,
    assignment: 0,
    submission: "",
    teacher_feedback: "",
    date_reviewed: null,
  });

  useEffect(() => {
    if (token) {
      getUserByToken(token).then((data) => setCurrentUser(data.user));
    }
  }, [token]);

  useEffect(() => {
    getAssignments().then((assignmentArray) => setAssignments(assignmentArray));
  }, []);

  const navigate = useNavigate();

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
      date_reviewed: null,
    };

    fetch("http://localhost:8000/submissions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
      },
      body: JSON.stringify(messageToSendToAPI),
    })
      .then((response) => response.json())
      .then((data) => {
        // If tags were selected, create the post/tag relationships with the new post id
        navigate(`/standardsubmissionslist`);
      });
  };

  return (
    <div className="container">
      <h2 className="title is-2">Submission</h2>
      <form>
        <div className="field">
        <label className="label is-size-3">Assignment</label>
          <div className="control">
            <div className="select">
              <select
                value={submission.assignment.id}
                onChange={(evt) => {
                  const copy = { ...submission };
                  copy.assignment = parseInt(evt.target.value);
                  createSubmission(copy);
                }}
              >
                <option value="0">List of Assignments</option>
                {assignments.map((assignment) => (
                  <option key={`assignment--${assignment.id}`} value={assignment.id}>
                    {assignment.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="field">
          <label className="label is-size-3">Writing Exercise</label>
          <div className="control">
            <textarea
              required
              type="text"
              class="textarea is-large"
              placeholder="Please Write Your Submission"
              rows="10"
              name="submission"
              value={submission.submission}
              onChange={(evt) => {
                const copy = { ...submission };
                copy.submission = evt.target.value;
                createSubmission(copy);
              }}
            />
          </div>
        </div>

        <div className="field">
          <div className="control">
            <button className="button is-primary button is-large buttons is-center" onClick={handleSaveButtonClick}>
              Submit 
            </button>
          </div>
        </div>

        {formError && (
          <div className="notification is-danger">
            Please fill in all of the required fields. You will not be approved until you do so. We don't mess around here.
          </div>
        )}
      </form>
    </div>
  );
};
