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