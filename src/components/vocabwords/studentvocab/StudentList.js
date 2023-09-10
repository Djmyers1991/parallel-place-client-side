import React, { useEffect, useState } from "react";
import { deleteWord, getStudentWords, getWords } from "../../../managers/words";
import {  Link, useNavigate } from "react-router-dom";


export const VocabListStudent = () => {
  const [words, setWords] = useState([]);
  const navigate = useNavigate()
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
      <button onClick={handleDelete}>
        Delete
      </button>
    );
  };

  return (
    <>
      <h2 className="vocabwords">Vocabulary Words</h2>
      <article className="words">
  {words.map((word) => {

return (
    <section className="package" key={word.id}>
{ !word.creator.is_staff ?
(
  <header>
  New Word: <Link to={`/editword/${word.id}`}>{word.name}</Link> </header>)
:
(
<header>{word.name}</header>
)
} 
        <section> Definition: {word.definition} </section>
         { !word.creator.is_staff ? (

        
        <footer>{deleteButton(word)}</footer>)
        :
(
            "" )
  }
        <div>----------------------------------------</div>
      </section>
    );
  })}
<button onClick={ () => {navigate('/wordsform')}}> Create New Word</button>
</article>
</>
)
}

