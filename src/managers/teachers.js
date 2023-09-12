export const getTeachers = () => {
    return fetch("http://localhost:8000/teachers", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    }).then(res => res.json());
}

export const deleteTeacher = (eliminateTeacher) => {
    return fetch(`http://localhost:8000/teachers/${eliminateTeacher.id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    });
};