document.addEventListener("DOMContentLoaded", async () => {
    await rafraichirTableauEntraineurs();
    configurerFormulaireEntraineur();
});

async function rafraichirTableauEntraineurs() {
    const tableBody = document.getElementById("liste-entraineurs");
    tableBody.innerHTML = `<tr><td colspan="5" class="text-center text-muted">Chargement...</td></tr>`;
    const entraineurs = await getAll("entraineur");
    tableBody.innerHTML = "";
    if (!entraineurs || entraineurs.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5" class="text-center text-danger">Aucun entraîneur dans la base de données.</td></tr>`;
        return;
    }
    entraineurs.forEach(entraineur => {
        const row = document.createElement("tr");
        const id = entraineur.id_entraineur || entraineur.ID_ENTRAINEUR;
        const nom = entraineur.nom || entraineur.NOM;
        const specialite = entraineur.specialite || entraineur.SPECIALITE;
        const jours = entraineur.disponibilite_jours || entraineur.DISPONIBILITE_JOURS;
        const heures = entraineur.disponibilite_heures || entraineur.DISPONIBILITE_HEURES;
        row.innerHTML = `
            <td><strong>#${id}</strong></td>
            <td>${nom}</td>
            <td>${specialite}</td>
            <td>${jours}</td>
            <td>${heures}</td>
        `;
        tableBody.appendChild(row);
    });
}

function configurerFormulaireEntraineur() {
    const form = document.getElementById("form-ajouter-entraineur");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const idVal = parseInt(document.getElementById("entraineur-id").value);
        const nomVal = document.getElementById("entraineur-nom").value;
        const specVal = document.getElementById("entraineur-specialite").value;
        const joursVal = document.getElementById("entraineur-jours").value;
        const heuresVal = document.getElementById("entraineur-heures").value;
        const nouvelEntraineur = {
            id_entraineur: idVal,
            nom: nomVal,
            specialite: specVal,
            disponibilite_jours: joursVal,
            disponibilite_heures: heuresVal,
            sessions_id_session: null,
            ID_ENTRAINEUR: idVal,
            NOM: nomVal,
            SPECIALITE: specVal,
            DISPONIBILITE_JOURS: joursVal,
            DISPONIBILITE_HEURES: heuresVal,
            SESSIONS_ID_SESSION: null
        };
        const succes = await create("entraineur", nouvelEntraineur);
        if (succes) {
            alert("Entraîneur ajouté avec succès !");
            form.reset();
            await rafraichirTableauEntraineurs(); 
        } else {
            alert("Erreur lors de l'ajout. L'ID est peut-être déjà pris ou le format est invalide.");
        }
    });
}