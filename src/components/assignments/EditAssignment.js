import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


export const EditTeacherAssignment = () => {
    const { assignmentId } = useParams();
    const [updatedAssignment, updateAssignment] = useState({
        title: "",
        teacher: 0,
        assignment_instructions: ""
    
    });
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8000/assignments/${assignmentId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("auth_token")}`
            }
        })
        .then(res => res.json())
        .then((assignmentData) => {
            updateAssignment(assignmentData)
        })
        .catch((error) => {
            // Handle any errors here, e.g., show an error message or redirect
            console.error("Error fetching word data:", error);
        });
    }, []);
    

  
    const changeAssignmentState = (domEvent) => {
        // Update the specific field in the newPost state
        const updated = { ...updatedAssignment };
        updated[domEvent.target.name] = domEvent.target.value;
        updateAssignment(updated);
    }
    return (
        <form className="postForm column">
            <h2 className="postFormHeader title">Edit Assignment</h2>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="title" className="subtitle">Update Title: </label>
                    <input type="text" name="title" required className="form-control input"
                        value={updatedAssignment.title}
                        onChange={changeAssignmentState}
                    />
                </div>
            </fieldset>


            <fieldset>
                <div className="form-group">
                    <label htmlFor="assignment_instructions" className="subtitle">Update Instructions: </label>
                    <input type="text" name="assignment_instructions" required className="form-control input"
                        value={updatedAssignment.assignment_instructions}
                        onChange={changeAssignmentState}
                    />
                </div>
            </fieldset>
            <button
                type="submit"
                onClick={evt => {
                    evt.preventDefault(); // Prevent form submission
                    const mostUpdatedAssignment = {
                        teacher: updatedAssignment?.teacher?.id, // Use the correct property from the state
                        assignment_instructions: updatedAssignment.assignment_instructions,
                        title: updatedAssignment.title
                    };
                    // Send the updated comment data to the server
                    fetch(`http://localhost:8000/assignments/${assignmentId}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Token ${localStorage.getItem("auth_token")}`
                        },
                        body: JSON.stringify(mostUpdatedAssignment)
                    })
                        .then(() => navigate(`/assignmentlist`)); // Navigate after successful update
                }}
                className="btn btn-primary"
            >
                Save
            </button>
            <button onClick={() => navigate(`/assignmentlist`)}> Cancel </button>
        </form>
    );
};
