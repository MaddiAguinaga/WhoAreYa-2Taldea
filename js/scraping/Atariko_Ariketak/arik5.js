import fs from 'fs';

// Datuak lortu, competitions.json fitxategian gorde string moduan eta ESP, ENG, ITA, FRA herrialdeetako TIER_ONE ligen id-ak lortu (Championship liga baztertuz)
fetch('http://api.football-data.org/v4/competitions')
    .then(
        r => r.json())
    .then(
        data => {
            // Lortutako json-a competitions.json fitxategian gorde string moduan
            fs.writeFileSync('competitions.json', JSON.stringify(data, null, 2));
            console.log('competitions.json fitxategia gordeta.');

            const competitions_TIER_ONE_ESP_ENG_ITA_FRA_id = data.competitions
                .filter(c => c.plan === "TIER_ONE")
                .filter(c => ["Spain", "Italy", "England", "France"].includes(c.area.name))
                .filter(c => c.name != "Championship")
                .map(c => c.id);

            console.log('ESP, ENG, ITA, FRA herrialdeetako TIER_ONE ligen id-ak lortu:');
            console.log(competitions_TIER_ONE_ESP_ENG_ITA_FRA_id);
        }
    )


