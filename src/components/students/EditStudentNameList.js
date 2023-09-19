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
      .then((response) => response.json())
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
        console.error("Error fetching student data:", error);
      });
  }, [studentId]);

  const changeStudentState = (domEvent) => {
    const { name, value } = domEvent.target;
    setStudentFormData({ ...studentFormData, [name]: value });
  };

  const changeUserState = (domEvent) => {
    const { name, value } = domEvent.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  return (
    <form className="studentForm column">
      <h2 className="title is-2">Update Student Profile</h2>

      <div className="field">
        <label className="label is-size-4">Email:</label>
        <div className="control">
          <input
            type="text"
            name="email"
            required
            className="input"
            value={userFormData.email}
            onChange={changeUserState}
          />
        </div>
      </div>

      <div className="field">
        <label className="label is-size-4">First Name:</label>
        <div className="control">
          <input
            type="text"
            name="first_name"
            required
            className="input"
            value={userFormData.first_name}
            onChange={changeUserState}
          />
        </div>
      </div>

      <div className="field">
        <label className="label is-size-4">Last Name:</label>
        <div className="control">
          <input
            type="text"
            name="last_name"
            required
            className="input"
            value={userFormData.last_name}
            onChange={changeUserState}
          />
        </div>
      </div>

      <div className="field">
        <label className="label is-size-4">Perceived IQ:</label>
        <div className="control">
          <input
            type="number"
            name="perceived_iq"
            required
            className="input"
            value={studentFormData.perceived_iq}
            onChange={changeStudentState}
          />
        </div>
      </div>
      <div className="field">
        <label className="label is-size-4">Writing Potential:</label>
        <div className="control">
          <input
            type="number"
            name="overall_potential"
            min="1"
            max="10"
            step=".1"
            required
            className="input"
            value={studentFormData.overall_potential}
            onChange={changeStudentState}
          />
        </div>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            onClick={(evt) => {
              evt.preventDefault();
              fetch(`http://localhost:8000/students/${studentId}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Token ${localStorage.getItem("auth_token")}`
                },
                body: JSON.stringify(studentFormData)
              })
                .then(() => {
                  return fetch(`http://localhost:8000/users/${studentId}`, {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                      "Authorization": `Token ${localStorage.getItem("auth_token")}`
                    },
                    body: JSON.stringify(userFormData)
                  });
                })
                .then(() => navigate(`/studentnamelist`))
                .catch((error) => {
                  console.error("Error:", error);
                });
            }}
            className="button is-primary"
          >
            Save
          </button>
        </div>
        <div className="control">
          <button onClick={() => navigate(`/studentnamelist`)} className="button is-danger">Cancel</button>
        </div>
      </div>
    </form>
  );
};
