import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const EditStudentNameList = () => {
  const { studentId } = useParams();
  const [studentFormData, setStudentFormData] = useState({
    perceived_iq: "",
    overall_potential: ""
  });
  const [userFormData, setUserFormData] = useState({
    first_name: "",
    last_name: "",
    email: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8000/students/${studentId}`, {
      headers: {
        "Authorization": `Token ${localStorage.getItem("auth_token")}`
      }
    })
      .then((response) => response.json()) // Parse the response as JSON
      .then((studentData) => {
        setUserFormData({
          first_name: studentData?.user?.first_name || "",
          last_name: studentData?.user?.last_name || "",
          email: studentData?.user?.email || ""
        });
        setStudentFormData({
          perceived_iq: studentData.perceived_iq || "",
          overall_potential: studentData.overall_potential || ""
        });
      })
      .catch((error) => {
        // Handle any errors here, e.g., show an error message or redirect
        console.error("Error fetching student data:", error);
      });
  }, [studentId]);

  const changeStudentState = (domEvent) => {
    // Update the specific field in the new student state
    const { name, value } = domEvent.target;
    setStudentFormData({ ...studentFormData, [name]: value });
  };

  const changeUserState = (domEvent) => {
    // Update the specific field in the new user state
    const { name, value } = domEvent.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  return (
    <form className="studentForm column">
      <h2 className="studentFormHeader title">Update Student Profile</h2>

      <fieldset>
        <div className="form-group">
          <label htmlFor="email" className="subtitle">Email: </label>
          <input
            type="text"
            name="email"
            required
            className="form-control input"
            value={userFormData.email}
            onChange={changeUserState}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="first_name" className="subtitle">First Name: </label>
          <input
            type="text"
            name="first_name"
            required
            className="form-control input"
            value={userFormData.first_name}
            onChange={changeUserState}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="last_name" className="subtitle">Last Name: </label>
          <input
            type="text"
            name="last_name"
            required
            className="form-control input"
            value={userFormData.last_name}
            onChange={changeUserState}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="perceived_iq" className="subtitle">Perceived Iq: </label>
          <input
            type="text"
            name="perceived_iq"
            required
            className="form-control input"
            value={studentFormData.perceived_iq}
            onChange={changeStudentState}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="overall_potential" className="subtitle">Overall Potential or Lack Thereof (1-10 scale): </label>
          <input
            type="text"
            name="overall_potential"
            required
            className="form-control input"
            value={studentFormData.overall_potential}
            onChange={changeStudentState}
          />
        </div>
      </fieldset>

      <button
        type="submit"
        onClick={evt => {
          evt.preventDefault(); // Prevent form submission

          // Send the updated student data to the server
          fetch(`http://localhost:8000/students/${studentId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Token ${localStorage.getItem("auth_token")}`
            },
            body: JSON.stringify(studentFormData)
          })
            .then(() => {
              // Send the updated user data to the server after the student data update is successful
              return fetch(`http://localhost:8000/users/${studentId}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Token ${localStorage.getItem("auth_token")}`
                },
                body: JSON.stringify(userFormData)
              });
            })
            .then(() => navigate(`/studentnamelist`)) // Navigate after successful update
            .catch(error => {
              // Handle errors if necessary
              console.error("Error:", error);
            });
        }}
        className="btn btn-primary"
      >
        Save
      </button>
      <button onClick={() => navigate(`/studentnamelist`)}> Cancel </button>
    </form>
  );
};
