export const getWords = () => {
    return fetch("http://localhost:8000/vocabwords", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    }).then(res => res.json());
};


export const deleteWord = (deadWord) => {
    return fetch(`http://localhost:8000/vocabwords/${deadWord.id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    });
};

export const getStudentWords = () => {
    return fetch("http://localhost:8000/vocabwords?student", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    }).then(res => res.json());
};
