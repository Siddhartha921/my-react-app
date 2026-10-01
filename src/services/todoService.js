const API_URL = import.meta.env.VITE_API_URL;

export async function getTodos() {
    const response = await fetch(`${API_URL}/todos`);

    if (!response.ok) {
        throw new Error("Failed to fetch tasks");
    }

    return response.json();
}