import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./TeacherNameList.css";


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
      .then((response) => response.json())
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
        console.error("Error fetching teacher data:", error);
      });
  }, [teacherId]);

  const changeTeacherState = (domEvent) => {
    const { name, value } = domEvent.target;
    setTeacherFormData({ ...teacherFormData, [name]: value });
  };

  const changeUserState = (domEvent) => {
    const { name, value } = domEvent.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  return (
    <form className="studentForm column">
      <h2 className="title is-2">Update Teacher Profile</h2>

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
        <label className="label is-size-4 ">Biography:</label>
        <div className="control ">
          <textarea
            type="text"
            class = "textarea is-medium times-new-roman-font"
            rows = "5"
            name="bio"
            required
            value={teacherFormData.bio}
            onChange={changeTeacherState}
          />
        </div>
      </div>

      <div className="field">
        <label className="label is-size-4">Favorite Book:</label>
        <div className="control">
          <input
            type="text"
            name="favorite_book"
            required
            className="input"
            value={teacherFormData.favorite_book}
            onChange={changeTeacherState}
          />
        </div>
      </div>

      <div className="field">
        <label className="label  is-size-4">Representing Image:</label>
        <div className="control">
          <input
            type="text"
            name="representing_image"
            required
            className="input is-link"
            placeholder="Link input"

            value={teacherFormData.representing_image}
            onChange={changeTeacherState}
          />
        </div>
      </div>









      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            onClick={(evt) => {
              evt.preventDefault();
              fetch(`http://localhost:8000/teachers/${teacherId}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Token ${localStorage.getItem("auth_token")}`
                },
                body: JSON.stringify(teacherFormData)
              })
                .then(() => {
                  return fetch(`http://localhost:8000/users/${teacherId}`, {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                      "Authorization": `Token ${localStorage.getItem("auth_token")}`
                    },
                    body: JSON.stringify(userFormData)
                  });
                })
                .then(() => navigate(`/teachernamelist`))
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
          <button onClick={() => navigate(`/teachernamelist`)} className="button is-danger">Cancel</button>
        </div>
      </div>
    </form>
  );
};
