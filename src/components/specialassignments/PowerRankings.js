import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteTeacher, getTeachers } from "../../managers/teachers";
import { getUserByToken } from "../../managers/tokens";
import "./PowerRankings.css";

export const PowerRankings = () => {
  const [characters, setCharacters] = useState([]);
  const navigate = useNavigate();
  const [token, setTokenState] = useState(localStorage.getItem("auth_token"));
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    fetch(`http://localhost:8000/characters`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
      },
    })
      .then((res) => res.json())
      .then((character) => setCharacters(character));
  }, []);

  useEffect(() => {
    if (token) {
      getUserByToken(token).then((data) => setCurrentUser(data.user));
    }
  }, [token]);

  const dragItem = React.useRef();
  const dragOverItem = React.useRef();

  const userLocalStorageKey = `characterOrder_${currentUser ? currentUser.id : "guest"}`;

  // Load the order of characters from local storage when the component mounts.
  useEffect(() => {
    const savedOrder = localStorage.getItem(userLocalStorageKey);
    if (savedOrder) {
      setCharacters(JSON.parse(savedOrder));
    }
  }, [userLocalStorageKey]);

  const handleSort = () => {
    let _characters = [...characters];

    const draggedItemContent = _characters.splice(dragItem.current, 1)[0];
    _characters.splice(dragOverItem.current, 0, draggedItemContent);

    dragItem.current = null;
    dragOverItem.current = null;

    setCharacters(_characters);

    // Save the updated order of characters to local storage.
    localStorage.setItem(userLocalStorageKey, JSON.stringify(_characters));
  };

  const resetLocalStorage = () => {
    localStorage.removeItem(userLocalStorageKey);
    // Perform any other actions needed to reset data or styles here
  };

  const getBackgroundColorClass = (index) => {
    if (index + 1 <= 5) {
      return "has-background-success-light";
    } else if (index + 1 <= 10) {
      return "has-background-warning-light";
    } else {
      return "has-background-danger-light";
    }
  };

  const getBackgroundColorBadge = (index) => {
    if (index + 1 <= 5) {
      return "has-background-success";
    } else if (index + 1 <= 10) {
      return "has-background-warning";
    } else {
      return "has-background-danger";
    }
  };



  return (
    <>
      <h1 className="powerRankings title is-2 has-text-centered">Power Rankings</h1>
  
      <div className="container has-text-centered">
        <article className="rankings title is-1 ">
          {characters.map((character, index) => (
            <div
              key={character.id}
              className={`list-item power-rank-card  ${getBackgroundColorClass(index)}`}
              draggable
              onDragStart={(e) => (dragItem.current = index)}
              onDragEnter={(e) => (dragOverItem.current = index)}
              onDragEnd={handleSort}
              onDragOver={(e) => e.preventDefault()}
            >
              <div className={`rank-badge ${getBackgroundColorBadge(index)}`}>
                <span className="rank-number">{index + 1}</span>
              </div>
       
              <h3 className="ranked-character">{character.name}</h3>
              <div className={`rank-badge ${getBackgroundColorBadge(index)}`}>
                <span className="rank-number">{index + 1}</span>
              </div>
            </div>
          ))}
        </article>
      </div>
  
      {/* {currentUser && currentUser.is_staff === true ? (
        <button onClick={resetLocalStorage} className="reset-button">
          Reset Local Storage
        </button>
      ) : (
        ""
      )} */}
    </>
  );
      }  
