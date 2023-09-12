import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const EditTeacherNameList = () => {
  const { teacherId } = useParams();
  const [teacherFormData, setTeacherFormData] = useState({
    bio: "",
    favorite_book: "",
    representing_image: ""
  });
  const [userFormData, setUserFormData] = useState({
    first_name: "",
    last_name: "",
    email: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8000/teachers/${teacherId}`, {
      headers: {
        "Authorization": `Token ${localStorage.getItem("auth_token")}`
      }
    })
      .then((response) => response.json()) // Parse the response as JSON
      .then((teacherData) => {
        setUserFormData({
          first_name: teacherData?.user?.first_name || "",
          last_name: teacherData?.user?.last_name || "",
          email: teacherData?.user?.email || ""
        });
        setTeacherFormData({
          bio: teacherData.bio || "",
          favorite_book: teacherData.favorite_book || "",
          representing_image: teacherData.representing_image || ""

        });
      })
      .catch((error) => {
        // Handle any errors here, e.g., show an error message or redirect
        console.error("Error fetching teacher data:", error);
      });
  }, [teacherId]);

  const changeTeacherState = (domEvent) => {
    // Update the specific field in the new teacher state
    const { name, value } = domEvent.target;
    setTeacherFormData({ ...teacherFormData, [name]: value });
  };

  const changeUserState = (domEvent) => {
    // Update the specific field in the new user state
    const { name, value } = domEvent.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  return (
    <form className="teacherForm column">
      <h2 className="teacherFormHeader title">Update Teacher Profile</h2>

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
          <label htmlFor="bio" className="subtitle">Biography: </label>
          <input
            type="text"
            name="bio"
            required
            className="form-control input"
            value={teacherFormData.bio}
            onChange={changeTeacherState}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="favorite_book" className="subtitle">Favorite Book: </label>
          <input
            type="text"
            name="favorite_book"
            required
            className="form-control input"
            value={teacherFormData.favorite_book}
            onChange={changeTeacherState}
          />
        </div>
      </fieldset>

      <button
        type="submit"
        onClick={evt => {
          evt.preventDefault(); // Prevent form submission

          // Send the updated teacher data to the server
          fetch(`http://localhost:8000/teachers/${teacherId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Token ${localStorage.getItem("auth_token")}`
            },
            body: JSON.stringify(teacherFormData)
          })
            .then(() => {
              // Send the updated user data to the server after the teacher data update is successful
              return fetch(`http://localhost:8000/users/${teacherId}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Token ${localStorage.getItem("auth_token")}`
                },
                body: JSON.stringify(userFormData)
              });
            })
            .then(() => navigate(`/teachernamelist`)) // Navigate after successful update
            .catch(error => {
              // Handle errors if necessary
              console.error("Error:", error);
            });
        }}
        className="btn btn-primary"
      >
        Save
      </button>
      <button onClick={() => navigate(`/teachernamelist`)}> Cancel </button>
    </form>
  );
};
