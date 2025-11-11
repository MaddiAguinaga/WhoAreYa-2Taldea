// Premier League-ko (LEAGUE_ID = 2021) taldeen jokalarien datuak eraldatu

const fs = require("fs");

// Sarrera eta irteera fitxategiak
const INPUT_FILE = "../.idea/httpRequests/premier.json";
const OUTPUT_FILE = "premier_transformatuta.json";

// Premier League IDa
const LEAGUE_ID = 2021;

// 1. Fitxategia irakurri eta javaScript objektu batera bihurtu
const data = JSON.parse(fs.readFileSync(INPUT_FILE, "utf8"));

// 2. Talde bakoitza eta bere jokalariak eraldatu
const jokalariak = [];

data.teams.forEach(team => {
    const teamId = team.id;
    const squad = team.squad; // taldeko jokalariak lortu

    squad.forEach(jokalaria => {
        // Posizioaren izena aldatzeko funtzioa
        const posizioIzenaAldatu = (pos) => {
            if (pos === "Goalkeeper") {
                return "GK";
            } else if (
                pos.includes("Defence") ||
                pos.includes("Back")
            ) {
                return "DF";
            } else if (pos.includes("Midfield")) {
                return "MF";
            } else if (
                pos.includes("Offence") ||
                pos.includes("Forward") ||
                pos.includes("Winger")
            ) {
                return "FW";
            } else {
                return pos;
            }
        };

    // Aldaketak aplikatu
    const jokalariaAldatua = {
        id: jokalaria.id,
        name: jokalaria.name,
        birthDate: jokalaria.dateOfBirth, // izen aldaketa
        nationality: jokalaria.nationality,
        teamId: teamId.toString(),
        leagueId: LEAGUE_ID.toString(),
        position: posizioIzenaAldatu(jokalaria.position)
    };

    jokalariak.push(jokalariaAldatua);
});
})
;

// 3. Emaitza fitxategi berrian gorde
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(jokalariak, null, 2), "utf8");

console.log(`Eraldaketa eginda! Emaitzak hemen daude: ${OUTPUT_FILE}`);
