import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const EditTeacherAssignment = () => {
  const { assignmentId } = useParams();
  const [updatedAssignment, updateAssignment] = useState({
    title: "",
    teacher: 0,
    assignment_instructions: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8000/assignments/${assignmentId}`, {
      headers: {
        "Authorization": `Token ${localStorage.getItem("auth_token")}`,
      },
    })
      .then((res) => res.json())
      .then((assignmentData) => {
        updateAssignment(assignmentData);
      })
      .catch((error) => {
        console.error("Error fetching word data:", error);
      });
  }, []);

  const changeAssignmentState = (domEvent) => {
    const updated = { ...updatedAssignment };
    updated[domEvent.target.name] = domEvent.target.value;
    updateAssignment(updated);
  };

  return (
    <div className="container">
      <h2 className="title is-2">Edit Assignment</h2>
      <form className="box" onSubmit={(evt) => {
        evt.preventDefault();
        const mostUpdatedAssignment = {
          teacher: updatedAssignment?.teacher?.id,
          assignment_instructions: updatedAssignment.assignment_instructions,
          title: updatedAssignment.title,
        };
        fetch(`http://localhost:8000/assignments/${assignmentId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("auth_token")}`,
          },
          body: JSON.stringify(mostUpdatedAssignment),
        })
          .then(() => navigate(`/assignmentlist`));
      }}>
        <div className="field">
          <label className="label is-large">Update Title</label>
          <div className="control">
            <input
              type="text"
              name="title"
              className="input"
              required
              value={updatedAssignment.title}
              onChange={changeAssignmentState}
            />
          </div>
        </div>
        <div className="field">
          <label className="label is-large">Update Instructions</label>
          <div className="control">
            <textarea
              type="text"
              name="assignment_instructions"
              required
            class="textarea input is-medium"
            rows="7"


              value={updatedAssignment.assignment_instructions}
              onChange={changeAssignmentState}
            />
          </div>
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button type="submit" className="button is-primary">Save</button>
          </div>
          <div className="control">
            <button type="button" onClick={() => navigate(`/assignmentlist`)} className="button">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  );
};
