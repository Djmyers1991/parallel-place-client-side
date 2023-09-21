import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAssignments } from "../../managers/assignments";
import { getUserByToken } from "../../managers/tokens";
import "./../submissions/SubmissionForm.css"; // Import your CSS file here for custom styling

export const StudentInspirationForm = () => {
    const [formError, setFormError] = useState(false);
    const [token, setTokenState] = useState(localStorage.getItem("auth_token"));
    const [currentUser, setCurrentUser] = useState();
    const [inspiration, createInspiration] = useState({
        student: 0,
        novel: "",
        author: "",
        image: "",
        relevance_scale: 1,
        explanation: "",
    });

    useEffect(() => {
        if (token) {
            getUserByToken(token).then((data) => setCurrentUser(data.user));
        }
    }, [token]);

    const navigate = useNavigate();

    const handleSaveButtonClick = (event) => {
        event.preventDefault();
        if (
            !inspiration.novel ||
            !inspiration.author ||
            !inspiration.relevance_scale ||
            !inspiration.explanation
        ) {
            setFormError(true);
            return;
        }
        const messageToSendToAPI = {
            student: inspiration?.currentUser?.id,
            novel: inspiration.novel,
            author: inspiration.author,
            image: inspiration.image,
            relevance_scale: inspiration.relevance_scale,
            explanation: inspiration.explanation,
        };

        fetch("http://localhost:8000/inspirations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Token ${localStorage.getItem("auth_token")}`,
            },
            body: JSON.stringify(messageToSendToAPI),
        })
            .then((response) => response.json())
            .then((data) => {
                navigate(`/studentinspirationlist`);
            });
    };

    return (
        <div className="container">
            <h2 className="title is-2">Inspiration</h2>
            <form>
                <div className="field">
                    <label className="label is-size-3">Novel</label>
                    <div className="control">
                        <input
                            required
                            type="text"
                            className="input is-medium"
                            placeholder="Enter Novel"
                            value={inspiration.novel}
                            onChange={(evt) => {
                                const copy = { ...inspiration };
                                copy.novel = evt.target.value;
                                createInspiration(copy);
                            }}
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label is-size-3">Author</label>
                    <div className="control">
                        <input
                            required
                            type="text"
                            className="input is-medium"
                            placeholder="Enter Author"
                            value={inspiration.author}
                            onChange={(evt) => {
                                const copy = { ...inspiration };
                                copy.author = evt.target.value;
                                createInspiration(copy);
                            }}
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label is-size-3">Cover Image</label>
                    <div className="control">
                        <input
                            required
                            type="text"
                            name="image"
                            className="input is-medium is-link"
                            placeholder="Enter Cover Image URL"
                            value={inspiration.image}
                            onChange={(evt) => {
                                const copy = { ...inspiration };
                                copy.image = evt.target.value;
                                createInspiration(copy);
                            }}
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label is-size-3">Explanation</label>
                    <div className="control">
                        <textarea
                            required
                            type="text times-new-roman-font"
                            name="explanation"
                            className="textarea is-medium input is-medium"
                            rows="5"
                            placeholder="Enter Explanation"
                            value={inspiration.explanation}
                            onChange={(evt) => {
                                const copy = { ...inspiration };
                                copy.explanation = evt.target.value;
                                createInspiration(copy);
                            }}
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label is-size-3">Relevance Scale (%)</label>
                    <div className="control has-icons-right">
                        <input
                            required
                            type="number"
                            min="1"
                            max="100"
                            className="input is-medium"
                            placeholder="Enter Relevance Scale"
                            value={inspiration.relevance_scale}
                            onChange={(evt) => {
                                const copy = { ...inspiration };
                                copy.relevance_scale = parseFloat(evt.target.value);
                                createInspiration(copy);
                            }}
                        />
                        <span className="icon is-small is-right">
                            %
                        </span>
                    </div>
                </div>

                <div className="field">
                    <div className="control">
                        <button
                            className="button is-primary is-medium"
                            onClick={handleSaveButtonClick}
                        >
                            Submit
                        </button>
                    </div>
                </div>

                {formError && (
                    <div className="notification is-danger">
                        Please fill in all of the required fields.
                    </div>
                )}
            </form>
        </div>
    );
};
