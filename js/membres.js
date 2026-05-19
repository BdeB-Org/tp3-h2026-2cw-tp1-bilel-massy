document.addEventListener("DOMContentLoaded", async () => {
    await rafraichirTableauMembres();
    configurerFormulaire();
});

async function rafraichirTableauMembres() {
    const tableBody = document.getElementById("liste-membres");
    tableBody.innerHTML = `<tr><td colspan="4" class="text-center text-muted">Chargement...</td></tr>`;
    const membres = await getAll("membre");
    tableBody.innerHTML = "";
    if (!membres || membres.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="4" class="text-center text-danger">Aucun membre dans la base de données.</td></tr>`;
        return;
    }
    membres.forEach(membre => {
        const row = document.createElement("tr");
        const id = membre.id_membre || membre.ID_MEMBRE;
        const nom = membre.nom || membre.NOM;
        const courriel = membre.courriel || membre.COURRIEL;
        const telephone = membre.telephone || membre.TELEPHONE;
        row.innerHTML = `
            <td><strong>#${id}</strong></td>
            <td>${nom}</td>
            <td>${courriel}</td>
            <td>${telephone}</td>
        `;
        tableBody.appendChild(row);
    });
}

function configurerFormulaire() {
    const form = document.getElementById("form-ajouter-membre");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const idVal = parseInt(document.getElementById("membre-id").value);
        const nomVal = document.getElementById("membre-nom").value;
        const courrielVal = document.getElementById("membre-courriel").value;
        const telephoneVal = document.getElementById("membre-telephone").value;
        const nouveauMembre = {
            id_membre: idVal,
            nom: nomVal,
            courriel: courrielVal,
            telephone: telephoneVal,
            ID_MEMBRE: idVal,
            NOM: nomVal,
            COURRIEL: courrielVal,
            TELEPHONE: telephoneVal
        };
        const succes = await create("membre", nouveauMembre);
        if (succes) {
            alert("Membre ajouté avec succès !");
            form.reset();
            await rafraichirTableauMembres(); 
        } else {
            alert("Erreur lors de l'ajout. L'ID est peut-être déjà pris ou le format est invalide.");
        }
    });
}