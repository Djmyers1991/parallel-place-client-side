export const getCurrentUser = async () => {
    try {
        const response = await fetch(`http://localhost:8000/users?current=true`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Token ${localStorage.getItem("auth_token")}`,
            },
        });

        if (!response.ok) {
            // Handle non-successful response, e.g., throw an error
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        // Handle any errors that occurred during the fetch
        console.error("Error fetching current user:", error);
        throw error; // You can choose to handle or rethrow the error as needed
    }
};