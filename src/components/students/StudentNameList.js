import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteStudent, getStudents } from "../../managers/students";
import { getUserByToken } from "../../managers/tokens";
import "./StudentNameList.css"; // Import your CSS file here for custom styling

export const StudentNameList = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();
  const [token, setTokenState] = useState(localStorage.getItem("auth_token"));
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    if (token) {
      getUserByToken(token).then((data) => setCurrentUser(data.user));
    }
  }, [token]);

  useEffect(() => {
    getStudents().then((student) => setStudents(student));
  }, []);

  const deleteButton = (eliminateStudent) => {
    const handleDelete = () => {
      const shouldDelete = window.confirm("Are you sure you want to delete this student?");
      if (shouldDelete) {
        deleteStudent(eliminateStudent).then(() => {
          setStudents((currentStudents) =>
            currentStudents.filter((student) => student.id !== eliminateStudent.id)
          );
        });
      }
    };

    return (
      <button className="button is-danger is-small" onClick={handleDelete}>
        Delete
      </button>
    );
  };

  const getBackgroundColorClass = (writingPotential) => {
    if (writingPotential > 8) {
      return "has-background-success-light";
    } else if (writingPotential > 3) {
      return "has-background-warning-light";
    } else {
      return "has-background-danger-light";
    }
  };

  return (
    <div className="student-list-container">
      <h2 className="title is-2">Student Information</h2>
      <div className="columns is-multiline">
        {students.map((student) => (
          <div className="column is-one-third" key={student.id}>
          <div className={`card ${getBackgroundColorClass(student.overall_potential)}`} key={student.id}>
              <div className={`card-content ${getBackgroundColorClass(student.overall_potential)}`}>
                <header className="title is-5">
                  <Link to={`/editstudentprofile/${student.id}`}>{student.full_name}</Link>
                </header>
                <div>Email: {student?.user?.email}</div>
                {currentUser?.is_staff && (
                  <>
                    <div>Perceived IQ: {student.perceived_iq}</div>
                    <div>Writing Potential: {student.overall_potential}/10</div>
                  </>
                )}
              </div>
              <footer className="card-footer">
                {currentUser?.is_staff || currentUser?.id === student.id ? (
                  <button className="card-footer-item">{deleteButton(student)}</button>
                ) : null}
              </footer>
            </div>
          </div>
        ))}
      </div>
      {/* <button className="button is-primary" onClick={() => navigate("/studentform")}>
        Create New Student
      </button> */}
    </div>
  );
};
