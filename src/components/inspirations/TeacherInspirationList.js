import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserByToken } from "../../managers/tokens";
import { deleteInspiration } from "../../managers/inspirations";
import { getStudents } from "../../managers/students";

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
      <button onClick={handleDelete}>
        Delete
      </button>
    );
  };

  return (
    <>
      <div className="column" style={{ margin: "0rem 3rem" }}>
        <h1 className="title">Inspiration List</h1>
        <div className="form-group">
          <label htmlFor="category" className="subtitle">Students: </label>
          <select name="category" className="form-control select" onChange={handleStudentChange}>
            <option value={0}>Select a student</option>
            {students.map((student) => (
              <option key={`studentFilter--${student.id}`} value={student.id}>
                {student.full_name}
              </option>
            ))}
          </select>
        </div>
        <article className="inspiration">
          {inspirations.map((inspiration) => (
            <section className="inspirations" key={inspiration.id}>
              <header>
                {inspiration?.student?.full_name}'s Inspirations:{" "}
               <div> {inspiration.novel} by {inspiration.author}</div>
              </header>
              <div>
                <img src={inspiration.image} alt="random image" />
              </div>
              <div>Relevancy Score (must add up to 100): {inspiration.relevance_scale}</div>
              <div>Explanation: {inspiration.explanation}</div>
              <footer>{deleteButton(inspiration)}</footer>
              <div>----------------------------------------</div>
            </section>
          ))}
          <button onClick={() => { navigate('/inspirationform') }}>Create Inspiration</button>
        </article>
      </div>
    </>
  );
};
