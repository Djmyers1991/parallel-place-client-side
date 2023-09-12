export const getAssignments = () => {
    return fetch("http://localhost:8000/assignments", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    }).then(res => res.json());
}
