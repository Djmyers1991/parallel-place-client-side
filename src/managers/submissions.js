export const getSubmissions = () => {
    return fetch("http://localhost:8000/submissions", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    }).then(res => res.json());
}

export const deleteSubmission = (eliminateSubmission) => {
    return fetch(`http://localhost:8000/submissions/${eliminateSubmission.id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    });
};

export const getSubmissionsByStudent = () => {
    return fetch("http://localhost:8000/submissions?student", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    }).then(res => res.json());
}