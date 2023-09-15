export const getInspirations = () => {
    return fetch("http://localhost:8000/inspirations", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    }).then(res => res.json());
}

export const deleteInspiration = (eliminateInspiration) => {
    return fetch(`http://localhost:8000/inspirations/${eliminateInspiration.id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    });
};

