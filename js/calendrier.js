document.addEventListener('DOMContentLoaded', () => {
    chargerCalendrier();
});

async function chargerCalendrier() {
    try {
        const data = await getAll('entrainements'); 
        afficherCalendrier(data.items); 
    } catch (error) {
        console.error("Erreur lors du chargement des données du calendrier:", error);
    }
}