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
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
      },
    })
      .then((res) => res.json())
      .then((inspirationData) => {
        update(inspirationData);
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
  };

  return (
    <form className="column">
      <h2 className="title">Edit your Inspiration</h2>

      <div className="field">
        <label className="label">New Inspiration:</label>
        <div className="control">
          <input
            required
            type="text"
            className="input"
            placeholder="Be Inspired"
            value={updatedInspiration.novel}
            onChange={(evt) => {
              const copy = { ...updatedInspiration };
              copy.novel = evt.target.value;
              update(copy);
            }}
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Author:</label>
        <div className="control">
          <input
            required
            type="text"
            className="input"
            placeholder="Be Inspired"
            value={updatedInspiration.author}
            onChange={(evt) => {
              const copy = { ...updatedInspiration };
              copy.author = evt.target.value;
              update(copy);
            }}
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Cover:</label>
        <div className="control">
          <input
            required
            
            type="text"
            className="input"
            placeholder="Be Inspired"
            value={updatedInspiration.image}
            onChange={(evt) => {
              const copy = { ...updatedInspiration };
              copy.image = evt.target.value;
              update(copy);
            }}
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Explanation:</label>
        <div className="control">
          <textarea
            required
            type="text"
            name="explanation"
            className="textarea times-new-roman-font"
            rows="5"
            placeholder="Enter Explanation"
            value={updatedInspiration.explanation}
            onChange={(evt) => {
              const copy = { ...updatedInspiration };
              copy.explanation = evt.target.value;
              update(copy);
            }}
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Relevancy Score:</label>
        <div className="control">
          <input
            required
            type="number"
            step="1"
            className="input"
            placeholder="Be Inspired"
            value={updatedInspiration.relevance_scale}
            onChange={(evt) => {
              const copy = { ...updatedInspiration };
              copy.relevance_scale = parseFloat(evt.target.value);
              update(copy);
            }}
          />
        </div>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            onClick={(evt) => {
              evt.preventDefault(); // Prevent form submission
              const improvedInspiration = {
                student: updatedInspiration?.currentUser?.id,
                novel: updatedInspiration.novel,
                author: updatedInspiration.author,
                image: updatedInspiration.image,
                relevance_scale: updatedInspiration.relevance_scale,
                explanation: updatedInspiration.explanation,
              };
              // Send the updated comment data to the server
              fetch(`http://localhost:8000/inspirations/${updatedInspiration.id}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Token ${localStorage.getItem("auth_token")}`,
                },
                body: JSON.stringify(improvedInspiration),
              }).then(() => navigate(`/studentinspirationlist`)); // Navigate after successful update
            }}
            className="button is-primary"
          >
            Save
          </button>
        </div>
        <div className="control">
          <button onClick={() => navigate(`/studentinspirationlist`)} className="button">
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};
