import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserByToken } from "../../managers/tokens";


export const StudentInspirationForm = () => {

    const [formError, setFormError] = useState(false);
    const [token, setTokenState] = useState(localStorage.getItem('auth_token'))
    const [currentUser, setCurrentUser]= useState()


    // Default state for all tags to list on form


    const [inspiration, createInspiration] = useState({
        student: 0,
        novel: "",
        author: "",
        image: "",
        relevance_scale: 0,
        explanation: ""

 
    });



    useEffect(() => {
        if (token) {
            getUserByToken(token).then(data => setCurrentUser(data.creator))
        }
    }, [token])

    const navigate = useNavigate();

    const handleSaveButtonClick = (event) => {
        event.preventDefault();
        if (!inspiration.novel || !inspiration.author  || !inspiration.relevance_scale || !inspiration.explanation) {
            setFormError(true);
            return;
        }
        const messageToSendToAPI = {
            student: inspiration?.currentUser?.id,
            novel: inspiration.novel,
            author: inspiration.author,
            image: inspiration.image,
            relevance_scale: inspiration.relevance_scale,
            explanation: inspiration.explanation
        }
    
        fetch("http://localhost:8000/inspirations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem("auth_token")}`
            },
            body: JSON.stringify(messageToSendToAPI)
        })
        .then(response => response.json())
        .then((data) => {
             
            // If tags were selected, create the post/tag relationships with the new post id
        
            navigate(`/studentinspirationlist`);
        });
    }
        


    return (
        <form className="inspiration column">
            <h2 className="inspirationFormHeader inspiration is-2">Add an Inspiration</h2>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="postHTML" className="novel">New Inspiration:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control input"
                        placeholder="Be Inspired"
                        value={inspiration.novel}
                        onChange={(evt) => {
                            const copy = { ...inspiration };
                            copy.novel = evt.target.value;
                            createInspiration(copy);
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
                        value={inspiration.author}
                        onChange={(evt) => {
                            const copy = { ...inspiration };
                            copy.author = evt.target.value;
                            createInspiration(copy);
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
                        value={inspiration.image}
                        onChange={(evt) => {
                            const copy = { ...inspiration };
                            copy.image = evt.target.value;
                            createInspiration(copy);
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
                        value={inspiration.explanation}
                        onChange={(evt) => {
                            const copy = { ...inspiration };
                            copy.explanation = evt.target.value;
                            createInspiration(copy);
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
                        value={inspiration.relevance_scale}
                        onChange={(evt) => {
                            const copy = { ...inspiration };
                            copy.relevance_scale = evt.target.value;
                            createInspiration(copy);
                        }}
                    />
                </div>
            </fieldset>
           <button onClick={handleSaveButtonClick}> Submit Inspiration </button>

          

            {formError && <div className="alert alert-danger">Please fill in all of the required fields. You will not be approved until you do so. We don't mess around here.</div>}
        </form>
    );
};
