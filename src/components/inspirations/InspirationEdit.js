import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


export const InspirationEdit = () => {
    const { inspirationId } = useParams();
    const [updatedInspiration, update] = useState({
        name: "",
        definition: "",
        creator: 0,
    });
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8000/inspirations/${inspirationId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("auth_token")}`
            }
        })
        .then(res => res.json())
        .then((inspirationData) => {
            update(inspirationData)
        })
        .catch((error) => {
            // Handle any errors here, e.g., show an error message or redirect
            console.error("Error fetching word data:", error);
        });
    }, []);
    

  
    const changeInspirationState = (domEvent) => {
        // Update the specific field in the newPost state
        const improvedInspiration = { ...updatedInspiration };
        improvedInspiration[domEvent.target.name] = domEvent.target.value;
        update(improvedInspiration);
    }
    return (
        <form className="postForm column">
            <h2 className="postFormHeader title">Edit your Inspiration</h2>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="postHTML" className="novel">New Inspiration:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control input"
                        placeholder="Be Inspired"
                        value={updatedInspiration.novel}
                        onChange={(evt) => {
                            const copy = { ...updatedInspiration };
                            copy.novel = evt.target.value;
                            update(copy);
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="postHTML" className="author">Author:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control input"
                        placeholder="Be Inspired"
                        value={updatedInspiration.author}
                        onChange={(evt) => {
                            const copy = { ...updatedInspiration };
                            copy.author = evt.target.value;
                            update(copy);
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="postHTML" className="image">Cover:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control input"
                        placeholder="Be Inspired"
                        value={updatedInspiration.image}
                        onChange={(evt) => {
                            const copy = { ...updatedInspiration };
                            copy.image = evt.target.value;
                            update(copy);
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="postHTML" className="explanation">Explain the Nexus:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control input"
                        placeholder="Be Inspired"
                        value={updatedInspiration.explanation}
                        onChange={(evt) => {
                            const copy = { ...updatedInspiration };
                            copy.explanation = evt.target.value;
                            update(copy);
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="postHTML" className="relevance_scale">Rate the Relevancy:</label>
                    <input
                        required autoFocus
                        type="float"
                        className="form-control input"
                        placeholder="Be Inspired"
                        value={updatedInspiration.relevance_scale}
                        onChange={(evt) => {
                            const copy = { ...updatedInspiration };
                            copy.relevance_scale = evt.target.value;
                            update(copy);
                        }}
                    />
                </div>
            </fieldset>
            <button
                type="submit"
                onClick={evt => {
                    evt.preventDefault(); // Prevent form submission
                    const improvedInspiration = {
                        student: updatedInspiration?.currentUser?.id,
                        novel: updatedInspiration.novel,
                        author: updatedInspiration.author,
                        image: updatedInspiration.image,
                        relevance_scale: updatedInspiration.relevance_scale,
                        explanation: updatedInspiration.explanation
                    };
                    // Send the updated comment data to the server
                    fetch(`http://localhost:8000/inspirations/${updatedInspiration.id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Token ${localStorage.getItem("auth_token")}`
                        },
                        body: JSON.stringify(improvedInspiration)
                    })
                        .then(() => navigate(`/studentinspirationlist`)); // Navigate after successful update
                }}
                className="btn btn-primary"
            >
                Save
            </button>
            <button onClick={() => navigate(`/studentinspirationlist`)}> Cancel </button>
        </form>
    );
};
