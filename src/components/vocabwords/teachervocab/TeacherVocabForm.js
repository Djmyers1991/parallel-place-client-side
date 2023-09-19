import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserByToken } from "../../../managers/tokens";
import "./VocabForm.css";

export const TeacherVocabForm = () => {
    const [formError, setFormError] = useState(false);
    const [token, setTokenState] = useState(localStorage.getItem("auth_token"));
    const [currentUser, setCurrentUser] = useState();

    const [word, update] = useState({
        creator: 0,
        name: "",
        definition: ""
    });

    useEffect(() => {
        if (token) {
            getUserByToken(token).then((data) => setCurrentUser(data.creator));
        }
    }, [token]);

    const navigate = useNavigate();

    const handleSaveButtonClick = (event) => {
        event.preventDefault();
        if (!word.name || !word.definition) {
            setFormError(true);
            return;
        }
        const messageToSendToAPI = {
            creator: word?.currentUser?.id,
            name: word.name,
            definition: word.definition
        };

        fetch("http://localhost:8000/vocabwords", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Token ${localStorage.getItem("auth_token")}`
            },
            body: JSON.stringify(messageToSendToAPI)
        })
            .then((response) => response.json())
            .then((data) => {
                // If tags were selected, create the post/tag relationships with the new post id
                navigate(`/words`);
            });
    };

    return (
        <div className="wordForm-container">
            <h2 className="wordFormHeader title is-2">Create a Vocabulary Flash Card</h2>
            <form className="wordForm">
                <div className="columns is-centered">
                    <div className="column is-half">
                        <div className="field">
                            <label className="label custom-label is-large">Word</label>
                            <div className="control has-icons-left">
                                <input
                                    className="input is-success is-large is-rounded is-focused custom-input"
                                    type="text"
                                    required
                                    autoFocus
                                    value={word.name}
                                    onChange={(evt) => {
                                        const copy = { ...word };
                                        copy.name = evt.target.value;
                                        update(copy);
                                    }}
                                />
                                <span className="icon is-small is-left">
                                    <i className="fas fa-user"></i>
                                </span>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label custom-label is-large">Definition</label>
                            <div className="control has-icons-left">
                                <textarea
                                    required
                                    autoFocus
                                    className="textarea is-success is-rounded is-focused custom-input"
                                    value={word.definition}
                                    onChange={(evt) => {
                                        const copy = { ...word };
                                        copy.definition = evt.target.value;
                                        update(copy);
                                    }}
                                ></textarea>
                                <span className="icon is-small is-left">
                                    <i className="fas fa-book"></i>
                                </span>
                            </div>
                        </div>
                        <div className="field has-text-centered">
                            <div className="control">
                                <button className="button is-primary" onClick={handleSaveButtonClick}>
                                    Create Card
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {formError && (
                    <div className="notification is-danger">
                        Please fill in all of the required fields. You will not be
                        approved until you do so. We don't mess around here.
                    </div>
                )}
            </form>
        </div>
    );
};