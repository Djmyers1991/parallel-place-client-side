import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAssignments } from "../../managers/assignments";
import { getUserByToken } from "../../managers/tokens";
import "./AssignmentList.css"; 

export const AssignmentList = () => {
  const [assignments, setAssignments] = useState([]);
  const navigate = useNavigate();
  const [token, setTokenState] = useState(localStorage.getItem("auth_token"));
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    if (token) {
      getUserByToken(token).then((data) => setCurrentUser(data.user));
    }
  }, [token]);

  useEffect(() => {
    getAssignments().then((assignmentArray) => setAssignments(assignmentArray));
  }, []);

  return (
    <div className="container">
      <h2 className="title is-2">Assignments</h2>
      <div className="columns is-multiline">
        {assignments.map((assignment) => (
          <div className="column is-half" key={assignment.id}>
            <div className="assignment-custom-card">
              <div className="card-content">
                <header className="title is-5">
                  {currentUser.is_staff ? (
                    <Link to={`/editassignment/${assignment.id}`}> {assignment.title}</Link>
                  ) : (
                    <Link to={`/standardassignmentform`}> {assignment.title}</Link>
                  )}
                </header>
                <div> {assignment.assignment_instructions}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
