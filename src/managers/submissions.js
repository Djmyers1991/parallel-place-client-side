export const getSubmissions = () => {
    return fetch("http://localhost:8000/submissions", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    }).then(res => res.json());
}
