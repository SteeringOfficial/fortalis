async function chargerSourate() {
      try {
        const reponse = await fetch("https://api.alquran.cloud/v1/surah/2/fr.hamidullah");
        const dataFr = await reponse.json();

        const reponseAr = await fetch("https://api.alquran.cloud/v1/surah/2/quran-simple");
        const dataAr = await reponseAr.json();

        const container = document.getElementById("versets");
        container.innerHTML = "";

        dataAr.data.ayahs.forEach((ayah, i) => {
          const arabe = ayah.text;
          const francais = dataFr.data.ayahs[i]?.text || "";

          const div = document.createElement("div");
          div.className = "verset";
          div.innerHTML = `
            <p class="arabe">${arabe}</p>
            <p class="francais">${i + 1}. ${francais}</p>
          `;
          container.appendChild(div);
        });
      } catch (err) {
        document.getElementById("versets").innerHTML = "<p>Erreur lors du chargement de la sourate.</p>";
        console.error(err);
      }
    }

    chargerSourate();