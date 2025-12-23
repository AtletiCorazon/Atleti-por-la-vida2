let data = [];

/*************************
 * CHARGEMENT DES DONNÉES
 *************************/
fetch("data.json")
    .then(response => response.json())
    .then(json => {
        data = json;
        generateQuiz();
    })
    .catch(error => {
        console.error("Erreur de chargement JSON :", error);
    });

/*************************
 * ÉLÉMENTS DU DOM
 *************************/
const searchInput = document.getElementById("searchInput");
const resultsContainer = document.getElementById("results");
const quizContainer = document.getElementById("quiz");

/*************************
 * MOTEUR DE RECHERCHE
 *************************/
searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    resultsContainer.innerHTML = "";

    if (query.length < 2) return;

    const filtered = data.filter(item =>
        item.nom.toLowerCase().includes(query) ||
        item.role.toLowerCase().includes(query) ||
        item.nationalite.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
        resultsContainer.innerHTML = "<p>Aucun résultat trouvé.</p>";
        return;
    }

    filtered.forEach(item => {
        resultsContainer.appendChild(createCard(item));
    });
});

/*************************
 * CARTES JOUEURS
 *************************/
function createCard(item) {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
        <img src="${item.image}" alt="${item.nom}">
        <div class="card-content">
            <h3>${item.nom}</h3>
            <p><strong>${item.surnom}</strong></p>
            <p>${item.description}</p>
            <div class="stats">
                <p><strong>Rôle :</strong> ${item.role}</p>
                <p><strong>Nationalité :</strong> ${item.nationalite}</p>
                <p><strong>Saisons :</strong> ${item.stats.saisons}</p>
                <p><strong>Matchs :</strong> ${item.stats.matchs}</p>
                <p><strong>Buts :</strong> ${item.stats.buts ?? "N/A"}</p>
                <p><strong>Passes :</strong> ${item.stats.passes ?? "N/A"}</p>
                <p><strong>Trophées :</strong> ${item.stats.trophees.join(", ")}</p>
            </div>
        </div>
    `;

    return card;
}

/*************************
 * QUIZ
 *************************/
function generateQuiz() {
    if (data.length === 0) return;

    const player = data[Math.floor(Math.random() * data.length)];
    const quizContainer = document.getElementById("quiz");

    quizContainer.innerHTML = `
        <h2>Quiz Atlético 🔴⚪</h2>
        <p>Quel est le surnom de ${player.nom} ?</p>
        <input type="text" id="quizAnswer">
        <button onclick="checkAnswer('${player.surnom}')">Valider</button>
        <p id="quizResult"></p>
    `;
}

function checkAnswer(correct) {
    const answer = document.getElementById("quizAnswer").value.toLowerCase();
    const result = document.getElementById("quizResult");

    if (answer === correct.toLowerCase()) {
        result.textContent = "✅ Bonne réponse ! Forza Atleti 🔥";
        result.style.color = "green";
    } else {
        result.textContent = `❌ Mauvaise réponse. Réponse : ${correct}`;
        result.style.color = "red";
    }
}
	
