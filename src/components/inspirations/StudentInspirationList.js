import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserByToken } from "../../managers/tokens";
import { deleteInspiration } from "../../managers/inspirations";
import "./StudentInspirationList.css"; // Import your CSS file here for custom styling

export const StudentInspirationList = () => {
  const [inspirations, setInspirations] = useState([]);
  const navigate = useNavigate();
  const [token, setTokenState] = useState(localStorage.getItem('auth_token'));
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    if (token) {
      getUserByToken(token).then(data => setCurrentUser(data.user));
    }
  }, [token]);

  useEffect(() => {
    if (currentUser) {
      fetch(`http://localhost:8000/inspirations?student=${currentUser.id}`, {
        headers: {
          "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
      })
      .then((res) => res.json())
      .then((inspiration) => setInspirations(inspiration));
    }
  }, [currentUser]);

  const deleteButton = (deadInspiration) => {
    const handleDelete = () => {
      const shouldDelete = window.confirm("Are you sure you want to delete this post?");
      if (shouldDelete) {
        deleteInspiration(deadInspiration).then(() => {
          setInspirations(prevInspirations => prevInspirations.filter(insp => insp.id !== deadInspiration.id));
        });
      }
    };

    return (
      <div className="buttons is-left">
        <button className="button is-danger is-small is-centered" onClick={handleDelete}>
          Delete
        </button>
      </div>
    );
  };

  return (
    <div className="inspiration-container">
      <h2 className="title is-3 teacher-title">Inspiration List of {currentUser?.first_name} {currentUser?.last_name}</h2>
      <div className="inspiration-column">
        {inspirations.map((inspiration) => (
          <div className="column is-half" key={inspiration.id}>
            <div className="inspiration-card">
              <div className="card-content">
                <header className="title is-5">
                  <Link to={`/editinspiration/${inspiration.id}`}>
                    {inspiration.novel} by {inspiration.author}
                  </Link>
                </header>
                <div>
                  <img  src={inspiration.image} alt="Random Image" />
                </div>
                <div>
                  Relevancy Score (must add up to 100): {inspiration.relevance_scale}
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