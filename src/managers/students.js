export const getStudents = () => {
    return fetch("http://localhost:8000/students", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    }).then(res => res.json());
}

export const deleteStudent = (eliminateStudent) => {
    return fetch(`http://localhost:8000/students/${eliminateStudent.id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    });
};
