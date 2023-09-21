import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserByToken } from "../../managers/tokens";
import { deleteInspiration } from "../../managers/inspirations";
import { getStudents } from "../../managers/students";
import "./StudentInspirationList.css"; // Import your CSS file here for custom styling

export const TeacherInspirationList = () => {
  const [inspirations, setInspirations] = useState([]);
  const navigate = useNavigate();
  const [token, setTokenState] = useState(localStorage.getItem('auth_token'));
  const [currentUser, setCurrentUser] = useState();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    getStudents().then(studentArray => setStudents(studentArray));
  }, []);

  useEffect(() => {
    if (token) {
      getUserByToken(token).then(data => setCurrentUser(data.user));
    }
  }, [token]);

  useEffect(() => {
    fetch(`http://localhost:8000/inspirations`, {
      headers: {
        "Authorization": `Token ${localStorage.getItem("auth_token")}`
      }
    })
    .then((res) => res.json())
    .then((inspiration) => setInspirations(inspiration));
  }, []);

  const handleStudentChange = (event) => {
    const studentId = parseInt(event.target.value);
    fetch(`http://localhost:8000/inspirations?student=${studentId}`, {
      headers: {
        "Authorization": `Token ${localStorage.getItem("auth_token")}`
      }
    })
    .then((res) => res.json())
    .then((inspiration) => setInspirations(inspiration));
  };

  const deleteButton = (deadInspiration) => {
    const handleDelete = () => {
      const shouldDelete = window.confirm("Are you sure you want to delete this post?");
      if (shouldDelete) {
        deleteInspiration(deadInspiration).then(() => {
          setInspirations((prevInspirations) => prevInspirations.filter((insp) => insp.id !== deadInspiration.id));
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
    <div className="inspiration-container">
      <h1 className="title is-1 is-centered is-text-large">Student Inspiration Lists</h1>
      <div className="form-group">
        <label htmlFor="category" className="subtitle is-3 inspiration-subtitle">Students: </label>
        <div className="select is-fullwidth is-centered">
          <select name="category" className="select" onChange={handleStudentChange}>
            <option value={0}>Select a student</option>
            {students.map((student) => (
              <option  key={`studentFilter--${student.id}`} value={student.id} className="inspiration_dropdown_student"> 
                {student.full_name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="inspiration-column">
        {inspirations.map((inspiration) => (
          <div className="column is-half" key={inspiration.id}>
            <div className="inspiration-card">
              <div className="card-content">
                  <header className="title is-3"> {inspiration.novel} by {inspiration.author}
</header>
                 
                <div>
                  <img  src={inspiration.image} alt="Random Image" />
                </div>
                <div>
                  Relevancy Score: {inspiration.relevance_scale}
                </div>
                <div>
                  Explanation: {inspiration.explanation}
                </div>
              </div>
              <footer className="card-footer button is-large has-text-centered">
                {deleteButton(inspiration)}
              </footer>
            </div>
          </div>
        ))}
      </div>
      <div className="buttons is-centered inspiration-create-button">
        <button className="button is-primary " onClick={() => navigate('/inspirationform')}>
          Create Inspiration
        </button>
      </div>
    </div>
  );
};
