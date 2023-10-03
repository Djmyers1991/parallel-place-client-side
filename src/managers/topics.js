export const getTopics = () => {
    return fetch("http://localhost:8000/discussiontopics", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    }).then(res => res.json());
}