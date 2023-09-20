import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteTeacher, getTeachers } from "../../managers/teachers";
import { getUserByToken } from "../../managers/tokens";
import "./TeacherNameList.css";

export const TeacherNameList = () => {
  const [teachers, setTeachers] = useState([]);
  const navigate = useNavigate();
  const [token, setTokenState] = useState(localStorage.getItem("auth_token"));
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    if (token) {
      getUserByToken(token).then((data) => setCurrentUser(data.user));
    }
  }, [token]);

  useEffect(() => {
    getTeachers().then((teacher) => setTeachers(teacher));
  }, []);

  const deleteButton = (eliminateTeacher) => {
    const handleDelete = () => {
      const shouldDelete = window.confirm("Are you sure you want to delete this teacher?");
      if (shouldDelete) {
        deleteTeacher(eliminateTeacher).then(() => {
          setTeachers((currentTeachers) =>
            currentTeachers.filter((teacher) => teacher.id !== eliminateTeacher.id)
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

  return (
    <div className="teacher-container">
      <h2 className="title is-2 teacher-title">Book Club Leaders</h2>
      <div className="columns is-multiline">
        {teachers.map((teacher) => (
          <div key={teacher.id}>
            <div className="card">
              <div className={`teacher-card card-content ${currentUser?.is_staff && currentUser.id === teacher.id ? "has-background-success-light" : ""}`}>
                <header className="title is-3">
                  {currentUser?.is_staff && currentUser.id === teacher.id ? (
                    <Link to={`/editteachernamelist/${teacher.id}`}>{teacher.full_name}</Link>
                  ) : (
                    teacher.full_name
                  )}
                <div className="title is-6">Email: {teacher?.user?.email}</div>

                </header>
                <div className="teacher-bio">

                  <img src={teacher.representing_image} alt="TeacherImage" />
                  <div>Bio: {teacher.bio}</div>

                </div>
              </div>
              <footer className="card-footer">
                {currentUser?.is_staff && currentUser?.id === teacher?.id || currentUser?.id === 1 ? (
                  <button className="card-footer-item">{deleteButton(teacher)}</button>
                ) : null}
              </footer>
            </div>
          </div>
        ))}
      </div>
      {/* stretch goal 1 <button className="button is-primary" onClick={() => navigate("/teacherform")}>
        Create New Teacher
      </button> */ }
    </div>
  );
};
