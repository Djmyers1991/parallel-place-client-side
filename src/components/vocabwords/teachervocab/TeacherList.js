import React, { useEffect, useState } from "react";
import { deleteWord, getWords } from "../../../managers/words";
import { Link, useNavigate } from "react-router-dom";
import "./TeacherVocabList.css"; // Import the CSS file here

export const VocabListTeacher = () => {
  const [words, setWords] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getWords().then((postsWord) => setWords(postsWord));
  }, []);

  const deleteButton = (deadWord) => {
    const handleDelete = () => {
      const shouldDelete = window.confirm("Are you sure you want to delete this post?");
      if (shouldDelete) {
        deleteWord(deadWord).then(() => {
          setWords((prevWords) => prevWords.filter((word) => word.id !== deadWord.id));
        });
      }
    };

    return (
      <button className="button is-danger delete-button" onClick={handleDelete}>
        Delete
      </button>
    );
  };

  return (
    <div className="vocab-page-container">
      <div className="title-container">
        <h2 className="title is-3 has-text-info">Vocabulary Notecards</h2>
      </div>
      <div className="content-container"> {/* Add a content container */}
        <article className="vocab-card-container">
          {words.map((word) => {
            return (
              <section className="package" key={word.id}>
                <div className="card">
                  <div className="card-front">
                    <header className="card-header">
                      <p className="card-header-title">
                        <Link to={`/editword/${word.id}`}>{word.name}</Link>
                      </p>
                    </header>
                  </div>
                  <div className="card-back">
                    <section>{word.definition}</section>
                    {deleteButton(word)}

                  </div>
                </div>
              </section>
            );
          })}
        </article>
        <div className="create-word-container">
          <button className="button is-primary" onClick={() => navigate('/wordsform')}>
            Create New Word
          </button>
        </div>
      </div>
    </div>
  );
};
