import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const EditTeacherWord = () => {
    const { wordId } = useParams();
    const [newWord, setWord] = useState({
        name: "",
        definition: "",
        creator: 0,
    });
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8000/vocabwords/${wordId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("auth_token")}`
            }
        })
        .then(res => res.json())
        .then((wordData) => {
            setWord(wordData);
        })
        .catch((error) => {
            console.error("Error fetching word data:", error);
        });
    }, [wordId]);

    const changeWordState = (domEvent) => {
        const updatedWord = { ...newWord };
        updatedWord[domEvent.target.name] = domEvent.target.value;
        setWord(updatedWord);
    };

    return (
        <div className="container">
            <h2 className="title is-2">Edit a Word</h2>
            <form>
                <div className="field">
                    <label className="label">Update Word:</label>
                    <div className="control">
                        <input
                            type="text"
                            name="name"
                            className="input"
                            required
                            value={newWord.name}
                            onChange={changeWordState}
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Definition:</label>
                    <div className="control">
                        <input
                            type="text"
                            name="definition"
                            className="input"
                            required
                            value={newWord.definition}
                            onChange={changeWordState}
                        />
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <button
                            type="submit"
                            onClick={(evt) => {
                                evt.preventDefault();
                                const updatedWord = {
                                    creator: newWord?.creator?.id,
                                    name: newWord.name,
                                    definition: newWord.definition
                                };
                                fetch(`http://localhost:8000/vocabwords/${newWord.id}`, {
                                    method: "PUT",
                                    headers: {
                                        "Content-Type": "application/json",
                                        "Authorization": `Token ${localStorage.getItem("auth_token")}`
                                    },
                                    body: JSON.stringify(updatedWord)
                                })
                                .then(() => navigate(`/words`));
                            }}
                            className="button is-primary "
                        >
                            Save
                        </button>
                        <button onClick={() => navigate(`/words`)} className="button is-danger ml-5">Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    );
};
