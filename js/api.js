const BASE_URL = "http://localhost:8080/ords/commande/";

async function getAll(endpoint) {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}/`);
        if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
        const data = await response.json();
        return data.items || [];
    } catch (error) {
        console.error(error);
        return [];
    }
}

async function getById(endpoint, id) {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}/${id}`);
        if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}