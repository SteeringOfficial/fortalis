const jours = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];
    const taches = ["cdi", "entrainement", "js", "fortalis", "ce qu'il y a faire", "lire", "dodo"];

    const planningContainer = document.getElementById("planning");

    // Charger depuis localStorage
    let planning = JSON.parse(localStorage.getItem("planningData")) || {};

    function creerPlanning() {
      planningContainer.innerHTML = "";
      jours.forEach(jour => {
        const dayDiv = document.createElement("div");
        dayDiv.className = "case_day";
        dayDiv.innerHTML = `<h3>${jour}</h3>`;
        
        taches.forEach(tache => {
          const state = planning[jour]?.[tache] || "";
          const taskDiv = document.createElement("div");
          taskDiv.className = "task";
          taskDiv.innerHTML = `
            <p>${tache}</p>
            <div class="buttons">
              <button class="ok ${state === 'ok' ? 'active' : ''}" title="OK"></button>
              <button class="oknok ${state === 'oknok' ? 'active' : ''}" title="OK/NOK"></button>
              <button class="nok ${state === 'nok' ? 'active' : ''}" title="NOK"></button>
            </div>
          `;
          const buttons = taskDiv.querySelectorAll("button");
          buttons.forEach(btn => btn.addEventListener("click", () => changerEtat(jour, tache, btn)));
          dayDiv.appendChild(taskDiv);
        });
        planningContainer.appendChild(dayDiv);
      });
    }

    function changerEtat(jour, tache, btn) {
      const parent = btn.parentElement;
      parent.querySelectorAll("button").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const etat = btn.classList.contains("ok") ? "ok" : btn.classList.contains("oknok") ? "oknok" : "nok";
      if (!planning[jour]) planning[jour] = {};
      planning[jour][tache] = etat;

      localStorage.setItem("planningData", JSON.stringify(planning));
    }

    document.getElementById("resetBtn").addEventListener("click", () => {
      if (confirm("Réinitialiser tout le planning ?")) {
        localStorage.removeItem("planningData");
        planning = {};
        creerPlanning();
      }
    });

    creerPlanning();