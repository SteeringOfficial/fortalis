const jours = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];
    const defaultTaches = ["cdi", "entrainement", "js", "fortalis", "ce qu'il y a faire", "lire", "dodo"];

    const planningContainer = document.getElementById("planning");
    let planning = JSON.parse(localStorage.getItem("planningData")) || {};

    function creerPlanning() {
      planningContainer.innerHTML = "";
      jours.forEach(jour => {
        const dayDiv = document.createElement("div");
        dayDiv.className = "case_day";
        dayDiv.innerHTML = `<h3>${jour}</h3>`;

        const taches = planning[jour]?.taches || defaultTaches;
        taches.forEach(tache => {
          const etat = planning[jour]?.etat?.[tache] || "";
          const taskDiv = document.createElement("div");
          taskDiv.className = "task";
          taskDiv.innerHTML = `
            <p>${tache}</p>
            <div class="buttons">
              <button class="ok ${etat === 'ok' ? 'active' : ''}" title="OK"></button>
              <button class="oknok ${etat === 'oknok' ? 'active' : ''}" title="OK/NOK"></button>
              <button class="nok ${etat === 'nok' ? 'active' : ''}" title="NOK"></button>
              <button class="delete-task" title="Supprimer">🗑️</button>
            </div>
          `;

          const [btnOk, btnOkNok, btnNok, btnDel] = taskDiv.querySelectorAll("button");
          btnOk.addEventListener("click", () => changerEtat(jour, tache, "ok", taskDiv));
          btnOkNok.addEventListener("click", () => changerEtat(jour, tache, "oknok", taskDiv));
          btnNok.addEventListener("click", () => changerEtat(jour, tache, "nok", taskDiv));
          btnDel.addEventListener("click", () => supprimerTache(jour, tache));

          dayDiv.appendChild(taskDiv);
        });

        const addBtn = document.createElement("button");
        addBtn.className = "add-task-btn";
        addBtn.textContent = "➕ Ajouter une tâche";
        addBtn.addEventListener("click", () => ajouterTache(jour));
        dayDiv.appendChild(addBtn);

        planningContainer.appendChild(dayDiv);
      });
    }

    function changerEtat(jour, tache, etat, taskDiv) {
      if (!planning[jour]) planning[jour] = { taches: [...defaultTaches], etat: {} };
      planning[jour].etat[tache] = etat;
      localStorage.setItem("planningData", JSON.stringify(planning));

      const buttons = taskDiv.querySelectorAll("button");
      buttons.forEach(b => b.classList.remove("active"));
      taskDiv.querySelector(`.${etat}`).classList.add("active");
    }

    function ajouterTache(jour) {
      const nouvelleTache = prompt("Nom de la nouvelle tâche :");
      if (!nouvelleTache) return;
      if (!planning[jour]) planning[jour] = { taches: [...defaultTaches], etat: {} };
      planning[jour].taches.push(nouvelleTache);
      localStorage.setItem("planningData", JSON.stringify(planning));
      creerPlanning();
    }

    function supprimerTache(jour, tache) {
      if (!confirm(`Supprimer la tâche "${tache}" ?`)) return;
      if (!planning[jour]) return;
      planning[jour].taches = planning[jour].taches.filter(t => t !== tache);
      delete planning[jour].etat[tache];
      localStorage.setItem("planningData", JSON.stringify(planning));
      creerPlanning();
    }

    document.getElementById("resetBtn").addEventListener("click", () => {
      if (confirm("Réinitialiser tout le planning ?")) {
        localStorage.removeItem("planningData");
        planning = {};
        creerPlanning();
      }
    });

    creerPlanning();