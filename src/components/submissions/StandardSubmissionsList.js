import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteSubmission, getSubmissions } from "../../managers/submissions";
import { getUserByToken } from "../../managers/tokens";
import "./Submissions.css"; // Import your CSS file here for custom styling

export const StandardSubmissionList = () => {
  const [submissions, setSubmissions] = useState([]);
  const navigate = useNavigate();
  const [token, setTokenState] = useState(localStorage.getItem("auth_token"));
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    if (token) {
      getUserByToken(token).then((data) => setCurrentUser(data.user));
      window.scrollTo(0, 0);

    }
  }, [token]);

  useEffect(() => {
    getSubmissions().then((submission) => setSubmissions(submission));
  }, []);

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
      <button className="button is-danger is-medium ml-1 mt-1 mb-1 px-4 mr-1" onClick={handleDelete}>
        Delete
      </button>
    );
  };

  const seeUngradedSubmissions = (event) => {
    fetch(`http://localhost:8000/submissions?incomplete`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
      },
    })
      .then((res) => res.json())
      .then((incompleteSubmissions) => setSubmissions(incompleteSubmissions));
  };

  const seeCurrentSubmissions = (event) => {
    fetch(`http://localhost:8000/submissions?currentungraded`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
      },
    })
      .then((res) => res.json())
      .then((incompleteSubmissions) => setSubmissions(incompleteSubmissions));
  };

  const getAllSubmissions = () => {
    getSubmissions().then((submission) => setSubmissions(submission));
  };

  const seeCurrentGraded = (event) => {
    fetch(`http://localhost:8000/submissions?graded`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
      },
    })
      .then((res) => res.json())
      .then((incompleteSubmissions) => setSubmissions(incompleteSubmissions));
  };

  return (
    <>
      <h2 className="title is-2" autoFocus>Submissions</h2>
      <div className="button-container mx-6">
        <button className="button is-success is-medium-small mx-1 my-1" onClick={seeUngradedSubmissions}>
          Unclaimed Submissions
        </button>

        <button className="button is-success is-medium-small mx-1 my-1" onClick={seeCurrentSubmissions}>
          Unfinished Submissions
        </button>

        <button className="button is-success is-medium-small mx-1 my-1" onClick={seeCurrentGraded}>
          Finished Submissions
        </button>

        <button className="button is-success is-medium-small mx-1 my-1" onClick={getAllSubmissions}>
          All Submissions
        </button>
      </div>


      <div className="submission-container">
        {submissions.map((submission) => (
          <div
            className={`submission-card card ${submission.date_reviewed !== null ? "has-green-border" : (submission.teacher !== null ? "currently-reviewing" : "has-red-border")}`}
            key={submission.id}
          >
            <div className="card-content times-new-roman-font">
              {!currentUser?.is_staff || !submission?.date_reviewed ? (
                <header className="subtitle title is-3">
                  <Link to={`/editstandardsubmission/${submission.id}`}>Submission {submission.id}</Link>{" "}
                </header>
              ) : (
                <header className="subtitle title is-3">
                  Submission {submission.id}
                </header>
              )}

              <div className="box darker-border">{submission?.student?.full_name}</div>
              <div className="box darker-border">
                {submission?.assignment?.title} Assignment Instructions:  <br></br> {submission?.assignment?.assignment_instructions}
              </div>
              <div className="box darker-border">Response: <br></br>{submission.submission}</div>
              {submission.date_reviewed !== null ? (
                <>
                  <div className="box darker-border">Feedback: <br></br> {submission.teacher_feedback}</div>
                  <div className="box darker-border">
                    Submission Complete: <br></br>
                    This essay was reviewed by {submission?.teacher?.full_name} on {submission.date_reviewed}.
                  </div>
                </>
              ) : (
                ""
              )}
              {!currentUser?.is_staff && submission.date_reviewed === null && !submission.teacher ? (
                <div className="box darker-border">
                  Submission Progress: <br></br>
                  Your assignment hasn't yet been ruthlessly judged with extreme niceties that border on condescension. You know how we English people do.
                </div>
              ) : (
                ""
              )}
              {submission.date_reviewed === null && submission.teacher ? (
                <div className="box darker-border">
                  Submission Currently In-Progress: <br></br>

                  Your assignment is currently being reviewed by {submission?.teacher?.full_name}.
                </div>
              ) : (
                ""
              )}
              <footer>{deleteButton(submission)}</footer>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
