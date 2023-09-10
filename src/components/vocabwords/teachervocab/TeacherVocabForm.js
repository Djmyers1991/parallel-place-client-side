import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserByToken } from "../../../managers/tokens";


export const TeacherVocabForm = () => {

    const [formError, setFormError] = useState(false);
    const [token, setTokenState] = useState(localStorage.getItem('auth_token'))
    const [currentUser, setCurrentUser]= useState()


    // Default state for all tags to list on form


    const [word, update] = useState({
        creator: 0,
        name: "",
        definition: ""
 
    });



    useEffect(() => {
        if (token) {
            getUserByToken(token).then(data => setCurrentUser(data.creator))
        }
    }, [token])

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
            definition: word.definition,
        }
    
        fetch("http://localhost:8000/vocabwords", {
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
        
            navigate(`/words`);
        });
    }
        


    return (
        <form className="wordForm column">
            <h2 className="wordFormHeader word is-2">Create a word</h2>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="wordHTML" className="name">New Word:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control input"
                        placeholder="THINK OF A FUN word"
                        value={word.name}
                        onChange={(evt) => {
                            const copy = { ...word };
                            copy.name = evt.target.value;
                            update(copy);
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="postHTML" className="definition">Write the definition:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control input"
                        placeholder="THINK OF A FUN word"
                        value={word.definition}
                        onChange={(evt) => {
                            const copy = { ...word };
                            copy.definition = evt.target.value;
                            update(copy);
                        }}
                    />
                </div>
            </fieldset>
           <button onClick={handleSaveButtonClick}> Submit Word </button>

          

            {formError && <div className="alert alert-danger">Please fill in all of the required fields. You will not be approved until you do so. We don't mess around here.</div>}
        </form>
    );
};
