import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


export const EditStudentWord = () => {
    const { wordId } = useParams();
    const [newWord, setWord] = useState({
        name: "",
        definition: "",
        creator: 0,
    });
    const [correctId, setId] = useState()
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8000/vocabwords/${wordId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("auth_token")}`
            }
        })
        .then(res => res.json())
        .then((wordData) => {
            setWord(wordData)
        })
        .catch((error) => {
            // Handle any errors here, e.g., show an error message or redirect
            console.error("Error fetching word data:", error);
        });
    }, []);
    

  
    const changeWordState = (domEvent) => {
        // Update the specific field in the newPost state
        const updatedWord = { ...newWord };
        updatedWord[domEvent.target.name] = domEvent.target.value;
        setWord(updatedWord);
    }
    return (
        <form className="postForm column">
            <h2 className="postFormHeader title">Edit a Word</h2>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="word" className="subtitle">Update Word: </label>
                    <input type="text" name="name" required className="form-control input"
                        value={newWord.name}
                        onChange={changeWordState}
                    />
                </div>
            </fieldset>


            <fieldset>
                <div className="form-group">
                    <label htmlFor="definition" className="subtitle">Definition: </label>
                    <input type="text" name="definition" required className="form-control input"
                        value={newWord.definition}
                        onChange={changeWordState}
                    />
                </div>
            </fieldset>
            <button
                type="submit"
                onClick={evt => {
                    evt.preventDefault(); // Prevent form submission
                    const updatedWord = {
                        creator: newWord?.creator?.id, // Use the correct property from the state
                        name: newWord.name,
                        definition: newWord.definition
                    };
                    // Send the updated comment data to the server
                    fetch(`http://localhost:8000/vocabwords/${newWord.id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Token ${localStorage.getItem("auth_token")}`
                        },
                        body: JSON.stringify(updatedWord)
                    })
                        .then(() => navigate(`/words`)); // Navigate after successful update
                }}
                className="btn btn-primary"
            >
                Save
            </button>
            <button onClick={() => navigate(`/words`)}> Cancel </button>
        </form>
    );
};
