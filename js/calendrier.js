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
function afficherCalendrier(entrainements) {
    const grille = document.getElementById('calendrier-grille');
    grille.innerHTML = ''; 

    const joursSemaine = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

    joursSemaine.forEach(jour => {
        const col = document.createElement('div');
        col.className = 'col';

        const entrainementsDuJour = entrainements.filter(e => e.jour === jour);

        let htmlContent = `
            <div class="card h-100 shadow-sm">
                <div class="card-header bg-primary text-white text-center fw-bold py-2">
                    ${jour}
                </div>
                <div class="card-body p-2">
        `;

        if (entrainementsDuJour.length === 0) {
            htmlContent += `<div class="text-center text-muted small mt-3">Aucun entraînement</div>`;
        } else {
            entrainementsDuJour.forEach(e => {
                htmlContent += `
                    <div class="border border-light rounded p-2 mb-2 bg-light text-dark small">
                        <strong>${e.heure_debut} - ${e.heure_fin}</strong><br>
                        Entraîneur ID: ${e.entraineur_id}<br>
                        <em>Activité: ${e.type_activite}</em>
                        <button class="btn btn-danger btn-sm w-100 mt-2" onclick="supprimerEntrainement(${e.id})">
                            Annuler
                        </button>
                    </div>
                `;
            });
        }

        htmlContent += `
                </div>
            </div>
        `;
        
        col.innerHTML = htmlContent;
        grille.appendChild(col);
    });
}
async function supprimerEntrainement(id) {
    if(confirm("Êtes-vous certain de vouloir annuler cet entraînement ?")) {
        try {
            await remove('entrainements', id);
            chargerCalendrier(); 
        } catch (error) {
            console.error("Erreur lors de la suppression:", error);
        }
    }
}