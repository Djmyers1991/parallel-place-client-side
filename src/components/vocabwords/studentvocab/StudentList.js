import React, { useEffect, useState } from "react";
import { deleteWord, getStudentWords, getWords } from "../../../managers/words";
import { Link, useNavigate } from "react-router-dom";

export const VocabListStudent = () => {
  const [words, setWords] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getStudentWords().then((postsWord) => setWords(postsWord));
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
    <>
      <div className="student-vocab-page-container">
        <div className="title-container">
        <div className="title-box">

          <h2 className="title is-3 has-text-black">Vocabulary Notecards</h2>
        </div>
        </div>
        <div className="content-container">
          <article className="vocab-card-container">
            {words.map((word) => {
              return (
                <section className="package" key={word.id}>
                  <div className="card">
                    <div className="card-front">
                      <header className="card-header">
                        {word.creator.is_staff ? (
                          <p className="card-header-title">{word.name}</p>
                        ) : (
                          <p className="card-header-title">
                            <Link to={`/editword/${word.id}`}>{word.name}</Link>
                          </p>
                        )}
                      </header>
                    </div>
                    <div className="card-back">
                      <section>{word.definition}</section>
                      {word.creator.is_staff ? "" : <footer>{deleteButton(word)}</footer>}
                    </div>
                  </div>
                </section>
              );
            })}
          </article>
          <div className="create-word-container">
            <button className="button is-primary" onClick={() => navigate("/wordsform")}>
              Create New Word
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
